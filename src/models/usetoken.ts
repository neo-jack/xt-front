// 令牌管理工具类
import { TOKEN_INFO } from '@/constants/token';
import { refreshToken } from '@/services/user/refresh';

// 令牌存储键名常量
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  EXPIRE_TIME: 'tokenExpireTime',
  USER_INFO: 'userInfo',
} as const;

// 令牌管理工具函数
export const TokenManager = {
  // 检查访问令牌是否过期
  isAccessTokenExpired: (): boolean => {
    const expireTime = localStorage.getItem(TOKEN_KEYS.EXPIRE_TIME);
    if (!expireTime) return true;
    return Date.now() >= Number(expireTime);
  },

  // 获取访问令牌
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  // 获取刷新令牌
  getRefreshToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  // 更新令牌信息
  updateTokens: (
    accessToken: string,
    expiresIn: number,
    refreshTokenValue?: string,
  ): void => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(
      TOKEN_KEYS.EXPIRE_TIME,
      (Date.now() + expiresIn * 1000).toString(),
    );

    if (refreshTokenValue) {
      localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshTokenValue);
    }
  },

  // 清除所有令牌
  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.EXPIRE_TIME);
    localStorage.removeItem(TOKEN_KEYS.USER_INFO);
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
    const expireTime = localStorage.getItem(TOKEN_KEYS.EXPIRE_TIME);
    if (!expireTime) return true;

    const fiveMinutesInMs = 5 * 60 * 1000;
    return Date.now() + fiveMinutesInMs >= Number(expireTime);
  },

  // 获取令牌剩余有效时间（毫秒）
  getTimeToExpiry: (): number => {
    const expireTime = localStorage.getItem(TOKEN_KEYS.EXPIRE_TIME);
    if (!expireTime) return 0;

    const remaining = Number(expireTime) - Date.now();
    return Math.max(0, remaining);
  },

  // 获取默认令牌信息（从 constants）
  getDefaultTokenInfo: () => TOKEN_INFO,
};


