import { request } from '@umijs/max';
import type {
  LogoutRequest,
  LogoutResponse,
} from './typings';

/*
 * ------------|| /api/user/logout ------------||
 */
export async function logout(params: LogoutRequest): Promise<LogoutResponse> {
  return request<LogoutResponse>('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
