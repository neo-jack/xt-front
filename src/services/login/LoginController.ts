import { request } from '@umijs/max';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './typings';

/**
 * 用户登录
 */
export async function login(params: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 用户登出
 */
export async function logout(): Promise<ApiResponse> {
  return request<ApiResponse>('/api/user/logout', {
    method: 'POST',
  });
}

/**
 * 获取当前用户信息
 */
export async function getUserInfo(): Promise<ApiResponse> {
  return request<ApiResponse>('/api/user/info', {
    method: 'GET',
  });
}

/**
 * 刷新访问令牌
 */
export async function refreshToken(
  params: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  return request<RefreshTokenResponse>('/api/user/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
