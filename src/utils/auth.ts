/*
- 实现 getToken()、setToken()、removeToken() 函数
- 实现 isTokenValid() 函数检查 token 有效性
- 使用 localStorage 存储 token
- 添加 token 过期时间检查逻辑
- 这样做是为了统一管理认证相关的工具函数，避免重复代码
*/

// 定义 token 和 token 过期时间
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRES_KEY = 'auth_token_expires';



export const getToken = (): string | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = localStorage.getItem(TOKEN_EXPIRES_KEY);
    
    if (!token || !expires) {
      return null;
    }
    
    // 检查 token 是否过期
    if (Date.now() > parseInt(expires)) {
      removeToken();
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('获取 token 失败:', error);
    return null;
  }
};

export const setToken = (token: string, expiresIn: number = 24 * 60 * 60 * 1000): void => {
  try {
    const expires = Date.now() + expiresIn;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRES_KEY, expires.toString());
  } catch (error) {
    console.error('存储 token 失败:', error);
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
  } catch (error) {
    console.error('删除 token 失败:', error);
  }
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  return !!token;
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};




