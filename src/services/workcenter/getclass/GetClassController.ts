import { request } from '@umijs/max';
import type {
  GetClassRequest,
  GetClassResponse,
} from './typings';

/*
 * ------------|| /api/workcenter/getclass ------------||
 */

/**
 * 获取工作中心分类列表
 * @returns Promise<GetClassResponse> 分类列表响应
 */
export async function getClass(): Promise<GetClassResponse> {
  console.log('[GetClass Service] 开始请求工作中心分类列表');
  
  try {
    const response = await request<GetClassResponse>('/api/workcenter/getclass', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // token通过Authorization header自动发送
    });
    
    console.log('[GetClass Service] 分类列表请求成功');
    console.log('[GetClass Service] 响应数据:', response);
    
    return response;
  } catch (error) {
    console.error('[GetClass Service] 分类列表请求失败:', error);
    throw error;
  }
}
