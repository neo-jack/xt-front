import { request } from '@umijs/max';
import type {
  SortFavoriteRequest,
  SortFavoriteResponse,
  SortFavoriteResult,
} from './typings';

/**
 * 更新收藏排序
 * 调用 POST /api/favorite/sort 接口
 * @param params 排序参数
 * @returns Promise<SortFavoriteResult> 排序结果
 */
export async function sortFavorite(params: SortFavoriteRequest): Promise<SortFavoriteResult> {
  console.log('[Sort Favorite Service] 开始更新收藏排序请求');
  console.log('[Sort Favorite Service] 新排序:', params.sortOrder);
  
  try {
    const response = await request<SortFavoriteResponse>('/api/favorite/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params.sortOrder, // 直接发送排序数组
    });

    console.log('[Sort Favorite Service] API响应:', response);

    // 根据mock API的响应格式处理结果
    if (response.code === 0) {
      console.log('[Sort Favorite Service] 更新排序成功');
      return {
        success: true,
        message: response.msg || '更新收藏排序成功',
      };
    } else {
      console.log('[Sort Favorite Service] 更新排序失败:', response.msg);
      return {
        success: false,
        message: response.msg || '更新收藏排序失败',
      };
    }
  } catch (error) {
    console.error('[Sort Favorite Service] 更新排序请求异常:', error);
    return {
      success: false,
      message: '网络错误，请稍后重试',
    };
  }
}

/**
 * 批量更新收藏排序（支持拖拽排序场景）
 * @param moduleIds 按新顺序排列的模块ID数组
 * @returns Promise<SortFavoriteResult> 排序结果
 */
export async function batchSortFavorite(moduleIds: string[]): Promise<SortFavoriteResult> {
  console.log('[Sort Favorite Service] 批量更新收藏排序');
  console.log('[Sort Favorite Service] 模块数量:', moduleIds.length);
  console.log('[Sort Favorite Service] 排序顺序:', moduleIds);

  if (!moduleIds || moduleIds.length === 0) {
    return {
      success: false,
      message: '排序数组不能为空',
    };
  }

  return sortFavorite({ sortOrder: moduleIds });
}

/**
 * 移动收藏到指定位置
 * @param fromIndex 原始位置索引
 * @param toIndex 目标位置索引
 * @param currentOrder 当前排序数组
 * @returns Promise<SortFavoriteResult> 排序结果
 */
export async function moveFavorite(
  fromIndex: number,
  toIndex: number,
  currentOrder: string[]
): Promise<SortFavoriteResult> {
  console.log('[Sort Favorite Service] 移动收藏位置');
  console.log('[Sort Favorite Service] 从位置', fromIndex, '移动到位置', toIndex);

  if (fromIndex < 0 || toIndex < 0 || fromIndex >= currentOrder.length || toIndex >= currentOrder.length) {
    return {
      success: false,
      message: '移动位置索引无效',
    };
  }

  if (fromIndex === toIndex) {
    return {
      success: true,
      message: '位置未改变',
    };
  }

  // 创建新的排序数组
  const newOrder = [...currentOrder];
  const [movedItem] = newOrder.splice(fromIndex, 1);
  newOrder.splice(toIndex, 0, movedItem);

  console.log('[Sort Favorite Service] 新排序:', newOrder);

  return sortFavorite({ sortOrder: newOrder });
}
