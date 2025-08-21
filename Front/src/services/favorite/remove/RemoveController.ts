import { request } from '@umijs/max';
import type {
  RemoveFavoriteRequest,
  RemoveFavoriteResponse,
  RemoveFavoriteResult,
} from './typings';

/**
 * 移除收藏
 * 调用 POST /api/favorite/remove 接口
 * @param params 移除收藏参数
 * @returns Promise<RemoveFavoriteResult> 移除结果
 */
export async function removeFavorite(params: RemoveFavoriteRequest): Promise<RemoveFavoriteResult> {
  console.log('[Remove Favorite Service] 开始移除收藏请求');
  console.log('[Remove Favorite Service] 模块ID:', params.modulesid);
  
  try {
    const response = await request<RemoveFavoriteResponse>('/api/favorite/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        modulesid: params.modulesid,
      },
    });

    console.log('[Remove Favorite Service] API响应:', response);

    // 根据mock API的响应格式处理结果
    if (response.code === 0) {
      console.log('[Remove Favorite Service] 移除收藏成功');
      return {
        success: true,
        message: response.msg || '取消收藏成功',
      };
    } else {
      console.log('[Remove Favorite Service] 移除收藏失败:', response.msg);
      return {
        success: false,
        message: response.msg || '取消收藏失败',
      };
    }
  } catch (error) {
    console.error('[Remove Favorite Service] 移除收藏请求异常:', error);
    return {
      success: false,
      message: '网络错误，请稍后重试',
    };
  }
}
