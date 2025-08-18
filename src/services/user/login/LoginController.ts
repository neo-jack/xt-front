import { request } from '@umijs/max';
import CryptoJS from 'crypto-js';
import type {
  LoginRequest,
  LoginResponse,
} from './typings';

/*
 * ------------|| /api/user/login ------------||
 */

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
export function hashPasswordMD5(password: string): string {
  return CryptoJS.MD5(password).toString();
}

/**
 * 智能密码处理函数
 * 如果输入已经是MD5格式，直接返回；否则进行MD5加密
 * @param password 密码（明文或MD5）
 * @returns string MD5哈希值
 */
export function processPassword(password: string): string {
  if (isMD5Format(password)) {
    console.log('[Login Service] 检测到MD5格式，直接使用');
    return password;
  } else {
    console.log('[Login Service] 检测到明文格式，进行MD5加密');
    return hashPasswordMD5(password);
  }
}

/**
 * 用户登录
 * @param params 登录参数（明文密码）
 * @returns Promise<LoginResponse> 登录响应
 */
export async function login(params: LoginRequest): Promise<LoginResponse> {
  console.log('[Login Service] 开始登录请求');
  console.log('[Login Service] 用户名:', params.username);
  console.log('[Login Service] 输入密码:', params.password ? params.password.substring(0, 10) + '...' : 'null');
  console.log('[Login Service] 密码格式检测:', isMD5Format(params.password) ? 'MD5格式' : '明文格式');
  
  // 智能密码处理（如果已经是MD5就直接用，否则进行MD5加密）
  const processedPassword = processPassword(params.password);
  console.log('[Login Service] 处理后密码:', processedPassword);
  
  const encryptedParams = {
    ...params,
    password: processedPassword,
  };
  
  console.log('[Login Service] 发送加密后的登录请求');
  
  return request<LoginResponse>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: encryptedParams,
  });
}
