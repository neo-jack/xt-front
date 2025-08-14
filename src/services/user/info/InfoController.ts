import { request } from '@umijs/max';
import type {
  UserInfoResponse,
} from './typings';

/*
 * ------------|| /api/user/info ------------||
 */
export async function getUserInfo(): Promise<UserInfoResponse> {
  return request<UserInfoResponse>('/api/user/info', {
    method: 'GET',
  });
}
