import { request } from '@umijs/max';
import type {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './typings';

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
