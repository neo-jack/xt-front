// 令牌管理工具类
import { refreshToken } from '@/services/login/LoginController';

// 令牌管理工具函数
export const TokenManager = {
  // 检查访问令牌是否过期
  isAccessTokenExpired: (): boolean => {
    const expireTime = localStorage.getItem('tokenExpireTime');
    if (!expireTime) return true;
    return Date.now() >= Number(expireTime);
  },

  // 获取访问令牌
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // 获取刷新令牌
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  // 更新令牌信息
  updateTokens: (
    accessToken: string,
    expiresIn: number,
    refreshTokenValue?: string,
  ): void => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem(
      'tokenExpireTime',
      (Date.now() + expiresIn * 1000).toString(),
    );

    if (refreshTokenValue) {
      localStorage.setItem('refreshToken', refreshTokenValue);
    }
  },

  // 清除所有令牌
  clearTokens: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpireTime');
    localStorage.removeItem('userInfo');
  },

  // 刷新访问令牌
  refreshAccessToken: async (): Promise<boolean> => {
    const refreshTokenValue = TokenManager.getRefreshToken();

    if (!refreshTokenValue) {
      return false;
    }

    try {
      const response = await refreshToken({ refreshToken: refreshTokenValue });

      if (response.code === 0 && response.data) {
        TokenManager.updateTokens(
          response.data.AccessToken,
          response.data.ExpiresIn,
          response.data.RefreshToken,
        );
        return true;
      } else {
        console.error('刷新令牌失败:', response.msg);
        return false;
      }
    } catch (error) {
      console.error('刷新令牌异常:', error);
      return false;
    }
  },

  // 检查令牌是否存在
  hasTokens: (): boolean => {
    const accessToken = TokenManager.getAccessToken();
    const refreshTokenValue = TokenManager.getRefreshToken();
    return !!(accessToken && refreshTokenValue);
  },

  // 检查令牌是否即将过期（提前5分钟警告）
  willExpireSoon: (): boolean => {
    const expireTime = localStorage.getItem('tokenExpireTime');
    if (!expireTime) return true;

    const fiveMinutesInMs = 5 * 60 * 1000;
    return Date.now() + fiveMinutesInMs >= Number(expireTime);
  },

  // 获取令牌剩余有效时间（毫秒）
  getTimeToExpiry: (): number => {
    const expireTime = localStorage.getItem('tokenExpireTime');
    if (!expireTime) return 0;

    const remaining = Number(expireTime) - Date.now();
    return Math.max(0, remaining);
  },
};
