import { request } from '@umijs/max';
import type {
  GetFavoriteListRequest,
  GetFavoriteListResponse,
  GetFavoriteListResult,
} from './typings';

/**
 * 获取收藏列表
 * 调用 POST /api/favorite/get 接口
 * @param params 获取收藏列表参数（可选，目前不需要参数）
 * @returns Promise<GetFavoriteListResult> 获取结果
 */
export async function getFavoriteList(params: GetFavoriteListRequest = {}): Promise<GetFavoriteListResult> {
  console.log('[Get Favorite List Service] 开始获取收藏列表请求');
  
  try {
    const response = await request<GetFavoriteListResponse>('/api/favorite/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });

    console.log('[Get Favorite List Service] API响应:', response);

    // 根据mock API的响应格式处理结果
    if (response.code === 0) {
      console.log('[Get Favorite List Service] 获取收藏列表成功，共', response.data?.length || 0, '项');
      return {
        success: true,
        message: response.msg || '获取收藏列表成功',
        data: response.data || [],
      };
    } else {
      console.log('[Get Favorite List Service] 获取收藏列表失败:', response.msg);
      return {
        success: false,
        message: response.msg || '获取收藏列表失败',
        data: [],
      };
    }
  } catch (error) {
    console.error('[Get Favorite List Service] 获取收藏列表请求异常:', error);
    return {
      success: false,
      message: '网络错误，请稍后重试',
      data: [],
    };
  }
}
