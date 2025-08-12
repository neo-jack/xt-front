import { request } from '@umijs/max';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
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
 * @param params 登出请求参数 { user_id: number }
 * @returns Promise<ApiResponse> 响应格式: { code: 0|(-1), data: null, msg: string }
 *   - code: 0 表示成功，-1 表示失败
 *   - data: 登出操作返回 null
 *   - msg: 响应消息 ('登出成功' | '用户ID参数无效')
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
