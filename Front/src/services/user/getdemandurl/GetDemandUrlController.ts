import { request } from '@umijs/max';
import type {
  GetDemandUrlRequest,
  GetDemandUrlResponse,
} from './typings';

/*
 * ------------|| /api/user/getdemandurl ------------||
 */

/**
 * 获取二维码URL
 * @returns Promise<GetDemandUrlResponse> 二维码URL响应
 */
export async function getDemandUrl(): Promise<GetDemandUrlResponse> {
  console.log('[GetDemandUrl Service] 开始请求二维码URL');
  
  try {
    const response = await request<GetDemandUrlResponse>('/api/user/getdemandurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 不需要发送data，token通过Authorization header自动发送
    });
    
    console.log('[GetDemandUrl Service] 二维码URL请求成功');
    console.log('[GetDemandUrl Service] 响应数据:', response);
    
    return response;
  } catch (error) {
    console.error('[GetDemandUrl Service] 二维码URL请求失败:', error);
    throw error;
  }
}
