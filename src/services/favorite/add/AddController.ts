import type {
  AddFavoriteRequest,
  AddFavoriteResponse,
  FavoriteModule,
} from './typings';

// 模拟数据存储
const STORAGE_KEY = 'user_favorites';

// 模拟网络延迟
const simulateNetworkDelay = (ms: number = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 获取localStorage中的收藏数据
const getFavoritesFromStorage = (): FavoriteModule[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('获取收藏数据失败:', error);
    return [];
  }
};

// 保存收藏数据到localStorage
const saveFavoritesToStorage = (favorites: FavoriteModule[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('保存收藏数据失败:', error);
  }
};

/*
 * ------------|| POST /api/v1/favorite ------------||
 */
export async function addFavorite(
  body?: AddFavoriteRequest,
): Promise<AddFavoriteResponse> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    if (!body?.moduleId) {
      return {
        success: false,
        errorMessage: '模块ID不能为空',
      };
    }

    const favorites = getFavoritesFromStorage();

    // 检查是否已存在
    const existingIndex = favorites.findIndex(
      (fav) => fav.id === body.moduleId,
    );
    if (existingIndex !== -1) {
      return {
        success: false,
        errorMessage: '该模块已经在收藏列表中',
      };
    }

    // 创建新的收藏项
    const newFavorite: FavoriteModule = {
      id: body.moduleId,
      name: body.moduleName,
      description: body.description,
      icon: body.icon,
      port: body.port,
      projectPath: body.projectPath,
      categoryName: body.categoryName,
      isFavorite: true,
      addedAt: new Date().toISOString(),
    };

    favorites.push(newFavorite);
    saveFavoritesToStorage(favorites);

    return {
      success: true,
      data: newFavorite,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `添加收藏失败: ${error}`,
    };
  }
}
