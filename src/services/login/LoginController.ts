import { request } from '@umijs/max';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './typings';

/*
 * ------------|| /api/user/login ------------||
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

/*
 * ------------|| /api/user/layout ------------||
 */

export async function logout(params: LogoutRequest): Promise<ApiResponse> {
  return request<ApiResponse>('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/*
 * ------------|| /api/user/info ------------||
 */


export async function getUserInfo(): Promise<ApiResponse> {
  return request<ApiResponse>('/api/user/info', {
    method: 'GET',
  });
}

/*
 * ------------|| /api/user/refresh ------------||
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
