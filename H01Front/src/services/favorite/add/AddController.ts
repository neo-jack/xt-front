import { request } from '@umijs/max';
import type {
  AddFavoriteRequest,
  AddFavoriteResponse,
  AddFavoriteResult,
} from './typings';

/**
 * 添加收藏
 * 调用 POST /api/favorite/add 接口
 * @param params 添加收藏参数
 * @returns Promise<AddFavoriteResult> 添加结果
 */
export async function addFavorite(params: AddFavoriteRequest): Promise<AddFavoriteResult> {
  console.log('[Add Favorite Service] 开始添加收藏请求');
  console.log('[Add Favorite Service] 模块ID:', params.modulesid);
  
  try {
    const response = await request<AddFavoriteResponse>('/api/favorite/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: params.modulesid,
        name: params.name || "未知模块",
        description: params.description || "模块描述",
        icon: params.icon || "AppstoreOutlined",
        port: params.port || 3000,
        url: params.url || `http://localhost:${params.port || 3000}`,
      },
    });

    console.log('[Add Favorite Service] API响应:', response);

    // 根据mock API的响应格式处理结果
    if (response.code === 0) {
      console.log('[Add Favorite Service] 添加收藏成功');
      return {
        success: true,
        message: response.msg || '添加收藏成功',
      };
    } else {
      console.log('[Add Favorite Service] 添加收藏失败:', response.msg);
      return {
        success: false,
        message: response.msg || '添加收藏失败',
      };
    }
  } catch (error) {
    console.error('[Add Favorite Service] 添加收藏请求异常:', error);
    return {
      success: false,
      message: '网络错误，请稍后重试',
    };
  }
}
