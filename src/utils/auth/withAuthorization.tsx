// 权限检查高阶组件 - UMI版本
// 这个组件负责检查用户权限并决定显示哪个页面

import { TokenManager } from '@/models/usetoken';
import { Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// 权限检查的高阶组件
function withAuthorization(WrappedComponent: FC) {
  return () => {
    const { pathname } = useLocation();
    const [authState, setAuthState] = useState<
      'checking' | 'authenticated' | 'unauthenticated'
    >('checking');

    useEffect(() => {
      const checkAndRefreshToken = async () => {
        const accessToken = TokenManager.getAccessToken();
        const refreshTokenValue = TokenManager.getRefreshToken();

        // 没有任何令牌，直接跳转登录
        if (!accessToken || !refreshTokenValue) {
          TokenManager.clearTokens();
          setAuthState('unauthenticated');
          return;
        }

        // 检查访问令牌是否过期
        if (TokenManager.isAccessTokenExpired()) {
          console.log('访问令牌已过期，尝试刷新...');

          // 尝试刷新令牌
          const refreshSuccess = await TokenManager.refreshAccessToken();

          if (refreshSuccess) {
            console.log('令牌刷新成功');
            setAuthState('authenticated');
          } else {
            console.log('令牌刷新失败，需要重新登录');
            TokenManager.clearTokens();
            message.warning('登录已过期，请重新登录');
            setAuthState('unauthenticated');
          }
        } else {
          // 访问令牌有效
          setAuthState('authenticated');
        }
      };

      checkAndRefreshToken();
    }, [pathname]);

    // 显示加载状态
    if (authState === 'checking') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Spin size="large" tip="验证登录状态..." />
        </div>
      );
    }

    // 已认证，渲染受保护的页面
    if (authState === 'authenticated') {
      return <WrappedComponent />;
    }

    // 未认证，重定向到登录页

    return <Navigate to="/login" replace />;
  };
}

export default withAuthorization;
