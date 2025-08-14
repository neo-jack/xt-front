import { request } from '@umijs/max';
import type {
  LoginRequest,
  LoginResponse,
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
