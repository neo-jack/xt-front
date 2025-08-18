// 运行时配置
import { message } from 'antd';
import { TokenManager } from '@/models/usetoken';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}
//----------------
//配置拦截器
//----------------

// 配置request拦截器
export const request = {
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      console.log('[Request Interceptor] 拦截器开始处理请求');
      
      // 自动添加token到请求头
      const accessToken = TokenManager.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        console.log('[Request Interceptor] 已添加Authorization头');
      } else {
        console.log('[Request Interceptor] 未找到token，跳过添加Authorization头');
      }
      
      // 添加默认Content-Type
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      
      console.log('[Request Interceptor] 请求配置:', {
        url: config.url,
        method: config.method,
        hasAuth: !!accessToken
      });
      
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      console.log('[Response Interceptor] 响应拦截器处理响应');
      
      const { data } = response;
      
      // 处理统一的响应格式
      if (data?.code !== undefined) {
        // 登录过期或无权限
        if (data.code === 401) {
          console.log('[Response Interceptor] 检测到401，token可能过期');
          message.error(data.msg || '登录已过期，请重新登录');
          
          // 清除token并跳转到登录页
          TokenManager.clearTokens();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
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
