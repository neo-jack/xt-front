import { request } from '@umijs/max';
import type {
  GetHeadshotListRequest,
  GetHeadshotListResponse,
} from './typings';

/*
 * ------------|| /api/user/getheadshotlist ------------||
 */
export async function getHeadshotList(
  params: GetHeadshotListRequest
): Promise<GetHeadshotListResponse> {
  return request<GetHeadshotListResponse>('/api/user/getheadshotlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
