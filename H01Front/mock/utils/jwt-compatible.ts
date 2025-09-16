/**
 * JWT兼容性工具
 * 生成与后端JWT格式兼容的Mock Token
 */

import * as crypto from 'crypto';
// 导入真实的用户数据
import { mockUsers } from '../../../Datebash/users';

// 与后端保持一致的JWT密钥（开发环境使用固定密钥）
// 注意：这应该与后端JwtUtil.java中的SECRET_KEY保持一致
const JWT_SECRET = 'your_secret_key_here_for_development_environment_only_replace_in_production';

// Node.js 环境下的 btoa polyfill
const btoa = (str: string): string => {
  return Buffer.from(str, 'ascii').toString('base64url'); // 使用base64url编码
};

/**
 * 生成HMAC-SHA256签名
 */
const generateHMACSignature = (data: string, secret: string): string => {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64url'); // 使用base64url编码
};

/**
 * 生成与后端兼容的JWT Token
 */
export const generateCompatibleJWT = (
  userId: number,
  username: string = `user_${userId}`,
  role: string = 'USER',
  tokenType: 'access' | 'refresh' = 'access'
): string => {
  const now = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
  const expiresIn = tokenType === 'access' ? 3600 : 86400; // access: 1小时, refresh: 24小时
  const exp = now + expiresIn; // 过期时间戳

  // JWT Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // JWT Payload (与后端JwtUtil.java保持一致)
  const payload = {
    username,
    role,
    userId,
    sub: username, // subject
    iat: now,      // issued at
    exp            // expires at
  };

  // Base64URL编码
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // 生成签名
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = generateHMACSignature(signingInput, JWT_SECRET);

  // 返回完整的JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * 验证JWT Token格式（Mock环境下的简单验证）
 */
export const validateCompatibleJWT = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    // 验证签名
    const [headerB64, payloadB64, signature] = parts;
    const signingInput = `${headerB64}.${payloadB64}`;
    const expectedSignature = generateHMACSignature(signingInput, JWT_SECRET);

    return signature === expectedSignature;
  } catch (error) {
    return false;
  }
};

/**
 * 从JWT中解析payload
 */
export const parseCompatibleJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(payloadJson);
  } catch (error) {
    return null;
  }
};

/**
 * 检查JWT是否过期
 */
export const isJWTExpired = (token: string): boolean => {
  const payload = parseCompatibleJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= payload.exp;
};

/**
 * 从JWT中获取用户ID
 */
export const getUserIdFromJWT = (token: string): number | null => {
  const payload = parseCompatibleJWT(token);
  return payload?.userId || null;
};

/**
 * 根据用户ID获取用户信息
 */
export const getUserInfo = (userId: number) => {
  const user = mockUsers.find(u => u.USER_ID === userId);
  if (user) {
    return {
      username: user.username,
      role: user.USER_ROLE.toUpperCase() // 转换为大写以保持一致性
    };
  }
  return { username: `user_${userId}`, role: 'USER' };
};
