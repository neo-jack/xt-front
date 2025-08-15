import { request } from '@umijs/max';
import type {
  AvatarUploadRequest,
  AvatarUploadResponse,
} from './typings';

/*
 * ------------|| /api/user/avatorupload ------------||
 */
export async function uploadAvatar(params: AvatarUploadRequest): Promise<AvatarUploadResponse> {
  return request<AvatarUploadResponse>('/api/user/avatorupload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
