// Token解析工具函数
// 提供统一的JWT token解析功能

/**
 * 从token解析用户ID
 * @param token Bearer token字符串
 * @returns 解析出的用户ID，解析失败返回null
 */
export const parseTokenUserId = (token: string): number | null => {
  console.log('[parseTokenUserId] 开始解析token');
  
  try {
    // 检查token是否存在且格式正确
    if (!token) {
      console.log('[parseTokenUserId] token为空');
      return null;
    }
    
    if (!token.startsWith('Bearer ')) {
      console.log('[parseTokenUserId] token格式错误，缺少Bearer前缀:', token.substring(0, 20) + '...');
      return null;
    }
    
    const tokenPart = token.replace('Bearer ', '');
    console.log('[parseTokenUserId] 提取token部分:', tokenPart.substring(0, 20) + '...');
    
    const parts = tokenPart.split('.');
    console.log('[parseTokenUserId] token分段数量:', parts.length);
    
    if (parts.length !== 3) {
      console.log('[parseTokenUserId] JWT格式错误，应该有3个部分，实际:', parts.length);
      return null;
    }
    
    // 解析payload部分
    console.log('[parseTokenUserId] 开始解析payload部分');
    const payload = JSON.parse(atob(parts[1]));
    console.log('[parseTokenUserId] payload解析成功:', JSON.stringify(payload, null, 2));
    
    const userId = payload.userId || null;
    console.log('[parseTokenUserId] 提取到的用户ID:', userId);
    
    return userId;
  } catch (error) {
    console.error('[parseTokenUserId] 解析token时发生错误:', error);
    console.error('[parseTokenUserId] 错误堆栈:', error instanceof Error ? error.stack : 'Unknown error');
    return null;
  }
};

/**
 * 验证token格式是否正确
 * @param token Bearer token字符串
 * @returns 是否为有效的JWT格式
 */
export const isValidTokenFormat = (token: string): boolean => {
  try {
    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }
    
    const tokenPart = token.replace('Bearer ', '');
    const parts = tokenPart.split('.');
    
    // JWT应该有3个部分：header.payload.signature
    if (parts.length !== 3) {
      return false;
    }
    
    // 尝试解析payload
    JSON.parse(atob(parts[1]));
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 从token解析完整的payload
 * @param token Bearer token字符串
 * @returns 解析出的payload对象，解析失败返回null
 */
export const parseTokenPayload = (token: string): any => {
  console.log('[parseTokenPayload] 开始解析token payload');
  
  try {
    if (!token || !token.startsWith('Bearer ')) {
      console.log('[parseTokenPayload] token格式错误');
      return null;
    }
    
    const tokenPart = token.replace('Bearer ', '');
    const parts = tokenPart.split('.');
    
    if (parts.length !== 3) {
      console.log('[parseTokenPayload] JWT格式错误');
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    console.log('[parseTokenPayload] payload解析成功');
    
    return payload;
  } catch (error) {
    console.error('[parseTokenPayload] 解析payload时发生错误:', error);
    return null;
  }
};

/**
 * 检查token是否过期
 * @param token Bearer token字符串
 * @returns 是否过期
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = parseTokenPayload(token);
  
  if (!payload || !payload.exp) {
    return true; // 没有过期时间信息，认为已过期
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= payload.exp;
};
