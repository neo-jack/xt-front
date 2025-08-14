import type {
  QueryFavoriteListRequest,
  QueryFavoriteListResponse,
} from './typings';

// 模拟数据存储
const STORAGE_KEY = 'user_favorites';

// 模拟网络延迟
const simulateNetworkDelay = (ms: number = 300) => {
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
 * ------------|| GET /api/v1/favorites ------------||
 */
export async function queryFavoriteList(
  params: QueryFavoriteListRequest = {},
): Promise<QueryFavoriteListResponse> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    const allFavorites = getFavoritesFromStorage();
    let filteredFavorites = [...allFavorites];

    // 关键词搜索
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      filteredFavorites = filteredFavorites.filter(
        (item: any) =>
          item.name?.toLowerCase().includes(keyword) ||
          item.description?.toLowerCase().includes(keyword),
      );
    }

    // 分类过滤
    if (params.categoryName) {
      filteredFavorites = filteredFavorites.filter(
        (item: any) => item.categoryName === params.categoryName,
      );
    }

    // 分页处理
    const current = params.current || 1;
    const pageSize = params.pageSize || 10;
    const total = filteredFavorites.length;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const list = filteredFavorites.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        current,
        pageSize,
        total,
        list,
      },
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `获取收藏列表失败: ${error}`,
      data: {
        current: 1,
        pageSize: 10,
        total: 0,
        list: [],
      },
    };
  }
}
