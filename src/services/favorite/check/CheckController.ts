import type {
  CheckFavoriteRequest,
  CheckFavoriteResponse,
} from './typings';

// 模拟数据存储
const STORAGE_KEY = 'user_favorites';

// 模拟网络延迟
const simulateNetworkDelay = (ms: number = 100) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 获取localStorage中的收藏数据
const getFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('获取收藏数据失败:', error);
    return [];
  }
};

/*
 * ------------|| GET /api/v1/favorite/check/{moduleId} ------------||
 */
export async function checkFavorite(
  params: CheckFavoriteRequest,
): Promise<CheckFavoriteResponse> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    if (!params.moduleId) {
      return {
        success: false,
        errorMessage: '模块ID不能为空',
        data: false,
      };
    }

    const favorites = getFavoritesFromStorage();
    const isFavorite = favorites.some((fav: any) => fav.id === params.moduleId);

    return {
      success: true,
      data: isFavorite,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `检查收藏状态失败: ${error}`,
      data: false,
    };
  }
}
