// 定义 token 和 token 过期时间
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRES_KEY = 'auth_token_expires';



// 删除 token
export const removeToken = (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRES_KEY);
    } catch (error) {
      console.error('删除 token 失败:', error);
    }
  };

  export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};



export const setToken = (token: string) => {
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


  
  
  export const isTokenValid = (): boolean => {
    const token = getToken();
    return !!token;
  };
  
  export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };