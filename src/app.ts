// 运行时配置
import { message } from 'antd';
import { TokenManager } from '@/models/usetoken';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

//----------------
// 在拦截器中，加入检查token管理
//----------------

// 检查token是否即将过期（使用TokenManager的方法）
const isTokenExpiringSoon = (): boolean => {
  return TokenManager.isAccessTokenExpired() || TokenManager.willExpireSoon();
};

// 刷新token的标记，防止并发刷新
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// 确保token有效（核心函数）
const ensureValidToken = async (): Promise<string | null> => {
  const accessToken = TokenManager.getAccessToken();
  
  // 如果没有token，直接返回null
  if (!accessToken) {
    console.log('[Token Manager] 没有找到访问令牌');
    return null;
  }
  
  // 如果token没有过期，直接返回
  if (!isTokenExpiringSoon()) {
    console.log('[Token Manager] 访问令牌仍然有效');
    return accessToken;
  }
  
  console.log('[Token Manager] 🔄 访问令牌即将过期，尝试刷新');
  
  // 如果正在刷新，等待刷新结果
  if (isRefreshing && refreshPromise) {
    console.log('[Token Manager]  等待正在进行的刷新操作...');
    try {
      const result = await refreshPromise;
      console.log('[Token Manager]  等待的刷新操作完成，结果:', !!result);
      return result;
    } catch (error) {
      console.error('[Token Manager]  等待的刷新操作失败:', error);
      return null;
    }
  }
  
  // 开始刷新过程
  console.log('[Token Manager] 🚀 开始新的刷新流程');
  isRefreshing = true;
  refreshPromise = performTokenRefresh();
  
  try {
    const newToken = await refreshPromise;
    console.log('[Token Manager] 🔄 刷新流程完成，结果:', !!newToken);
    return newToken;
  } catch (error) {
    console.error('[Token Manager] 🔄 刷新流程异常:', error);
    return null;
  } finally {
    // 🛡️ 确保状态被重置
    console.log('[Token Manager] 🧹 重置刷新状态');
    isRefreshing = false;
    refreshPromise = null;
  }
};

// 执行token刷新（带超时保护）
const performTokenRefresh = async (): Promise<string | null> => {
  try {
    console.log('[Token Manager] 🚀 开始刷新token...');
    
    // 🛡️ 超时保护：10秒后强制失败
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error('Token刷新超时')), 10000);
    });
    
    const refreshPromise = TokenManager.refreshAccessToken();
    
    // 竞速：要么刷新成功，要么超时
    const success = await Promise.race([refreshPromise, timeoutPromise]);
    
    if (success) {
      const newAccessToken = TokenManager.getAccessToken();
      console.log('[Token Manager] ✅ Token刷新成功');
      return newAccessToken;
    } else {
      console.log('[Token Manager] ❌ Token刷新失败');
      handleTokenExpired();
      return null;
    }
  } catch (error) {
    console.error('[Token Manager] 💥 Token刷新异常:', error);
    handleTokenExpired();
    return null;
  }
};

// 处理token完全过期的情况
const handleTokenExpired = (): void => {
  console.log('[Token Manager] Token已完全过期，清除本地存储');
  TokenManager.clearTokens();
  
  // 避免在登录页重复跳转
  if (window.location.pathname !== '/login') {
    message.error('登录已过期，请重新登录');
    window.location.href = '/login';
  }
};

//----------------
//配置拦截器
//----------------

// 配置request拦截器
export const request = {
  // 请求拦截器
  requestInterceptors: [
    async (config: any) => {
      console.log('[Request Interceptor] 拦截器开始处理请求:', config.url);
      
      // 🔍 跳过刷新token的请求，避免死锁
      const isRefreshRequest = config.url?.includes('/api/user/refresh');
      
      let accessToken = null;
      
      if (isRefreshRequest) {
        // 刷新token请求：直接使用现有token，不进行自动刷新检查
        accessToken = TokenManager.getAccessToken();
        console.log('[Request Interceptor] 🔄 刷新token请求，跳过自动刷新检查');
      } else {
        // 普通请求：检查并自动刷新token
        accessToken = await ensureValidToken();
      }
      
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        console.log('[Request Interceptor] 已添加Authorization头');
      } else {
        console.log('[Request Interceptor] 未找到有效token');
      }
      
      // 添加默认Content-Type
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      
      console.log('[Request Interceptor] 请求配置:', {
        url: config.url,
        method: config.method,
        isRefreshRequest,
        hasAuth: !!accessToken
      });
      
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    async (response: any) => {
      console.log('[Response Interceptor] 响应拦截器处理响应');
      
      const { data } = response;
      
      // 处理统一的响应格式
      if (data?.code !== undefined) {
        // 登录过期或无权限 - 由后端兜底处理
        if (data.code === 401) {
          console.log('[Response Interceptor] 检测到401，token已过期');
          
          // 后端兜底：直接处理token过期（前端检查的补充）
          handleTokenExpired();
          return Promise.reject(new Error(data.msg || '登录已过期'));
        }
        
        // 其他错误码处理
        if (data.code !== 0) {
          console.log('[Response Interceptor] 检测到错误响应:', data);
          // 可以在这里统一处理其他错误码
        }
      }
      
      return response;
    },
  ],

  // 错误处理
  errorConfig: {
    errorHandler: (error: any) => {
      console.error('[Request Error Handler] 请求错误:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            message.error('未授权，请重新登录');
            TokenManager.clearTokens();
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            break;
          case 403:
            message.error('权限不足');
            break;
          case 404:
            message.error('请求的资源不存在');
            break;
          case 500:
            message.error('服务器内部错误');
            break;
          default:
            message.error(data?.msg || `请求错误: ${status}`);
        }
      } else if (error.request) {
        message.error('网络错误，请检查网络连接');
      } else {
        message.error(error.message || '请求发生未知错误');
      }
      
      throw error;
    },
  },
};

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };
