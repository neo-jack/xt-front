import { request } from '@umijs/max';
import { TokenManager } from '@/models/usetoken';
import type {
  SetPasswordRequest,
  SetPasswordResponse,
} from './typings';

/*
 * ------------|| /api/user/setpassword ------------||
 */

/**
 * 修改用户密码
 * @param params 包含旧密码和新密码哈希值的请求参数
 * @returns Promise<SetPasswordResponse> 修改密码的响应结果
 */
export async function setPassword(params: SetPasswordRequest): Promise<SetPasswordResponse> {
  // 获取访问令牌
  const accessToken = TokenManager.getAccessToken();
  
  // 构建请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // 如果存在访问令牌，则添加到请求头
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return request<SetPasswordResponse>('/api/user/setpassword', {
    method: 'POST',
    headers,
    data: params,
  });
}

/**
 * 验证密码强度
 * @param password 明文密码
 * @returns boolean 是否符合密码强度要求
 */
export function validatePasswordStrength(password: string): boolean {
  // 密码强度验证规则
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return password.length >= minLength && hasLetter && hasNumber;
}

/**
 * 简单的密码哈希处理（实际项目中应使用更安全的加密算法）
 * @param password 明文密码
 * @returns string 哈希后的密码
 */
export function hashPassword(password: string): string {
  // 这里应该使用实际的加密算法，比如bcrypt、scrypt等
  // 当前只是示例，实际使用时需要替换为真正的加密方法
  try {
    const timestamp = Date.now().toString();
    const combined = password + timestamp;
    return btoa(combined).replace(/[^a-zA-Z0-9]/g, '').substring(0, 128);
  } catch (error) {
    throw new Error('密码加密失败');
  }
}

/**
 * 验证两次输入的密码是否一致
 * @param password 密码
 * @param confirmPassword 确认密码
 * @returns boolean 是否一致
 */
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}
