import { request } from '@umijs/max';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  data: {
    token: string;
    userInfo: {
      id: number;
      username: string;
      name: string;
      avatar: string;
      role: string;
      routes: string[];
      buttons: string[];
    };
  };
  msg: string;
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

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
