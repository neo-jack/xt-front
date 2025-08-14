import { request } from '@umijs/max';
import type { SystemInfoResponse } from './typings';

/*
 * ------------|| /api/system/info ------------||
 */
export async function getSystemInfo(): Promise<SystemInfoResponse> {
  return request<SystemInfoResponse>('/api/system/info', {
    method: 'GET',
  });
}
