import { request } from '@umijs/max';
import CryptoJS from 'crypto-js';
import type {
  SetPasswordRequest,
  SetPasswordResponse,
} from './typings';

/*
 * ------------|| /api/user/setpassword ------------||
 */

/**
 * 修改用户密码
 * @param params 包含旧密码和新密码MD5哈希值的请求参数
 * @returns Promise<SetPasswordResponse> 修改密码的响应结果
 */
export async function setPassword(params: SetPasswordRequest): Promise<SetPasswordResponse> {
  console.log('[SetPassword Service] 开始修改密码请求');
  console.log('[SetPassword Service] 旧密码MD5:', params.OLD_PWD ? params.OLD_PWD.substring(0, 8) + '...' : 'null');
  console.log('[SetPassword Service] 新密码MD5:', params.NEW_PWD ? params.NEW_PWD.substring(0, 8) + '...' : 'null');
  
  // 注意：Token现在由全局拦截器自动添加，无需手动处理
  console.log('[SetPassword Service] 发送修改密码请求（Token由拦截器自动添加）');
  
  return request<SetPasswordResponse>('/api/user/setpassword', {
    method: 'POST',
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
 * 检测字符串是否为MD5格式
 * @param str 待检测字符串
 * @returns boolean 是否为MD5格式
 */
export function isMD5Format(str: string): boolean {
  return /^[a-f0-9]{32}$/i.test(str);
}

/**
 * MD5密码加密函数
 * @param password 明文密码
 * @returns string MD5哈希值
 */
export function hashPassword(password: string): string {
  // 智能处理：如果已经是MD5格式，直接返回；否则进行MD5加密
  if (isMD5Format(password)) {
    console.log('[SetPassword Service] 检测到MD5格式，直接使用');
    return password;
  } else {
    console.log('[SetPassword Service] 检测到明文格式，进行MD5加密');
    return CryptoJS.MD5(password).toString();
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
