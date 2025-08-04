/* eslint-disable */
// 该文件由开发人员手动创建，实现收藏功能相关的API调用
// 当前使用 localStorage 模拟，后续可替换为真实 API

const STORAGE_KEY = 'user_favorites';

/**
 * 模拟网络延迟
 */
const simulateNetworkDelay = (ms: number = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 获取localStorage中的收藏数据
 */
const getFavoritesFromStorage = (): FavoriteAPI.FavoriteModule[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('获取收藏数据失败:', error);
    return [];
  }
};

/**
 * 保存收藏数据到localStorage
 */
const saveFavoritesToStorage = (
  favorites: FavoriteAPI.FavoriteModule[],
): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('保存收藏数据失败:', error);
  }
};

/** 获取收藏列表 GET /api/v1/favorites */
export async function queryFavoriteList(
  params: {
    // query
    /** 关键词搜索 */
    keyword?: string;
    /** 分类过滤 */
    categoryName?: string;
    /** 当前页码 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
  } = {},
  options?: { [key: string]: any },
): Promise<FavoriteAPI.Result_PageInfo_FavoriteModule__> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    const allFavorites = getFavoritesFromStorage();
    let filteredFavorites = [...allFavorites];

    // 关键词搜索
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      filteredFavorites = filteredFavorites.filter(
        (item) =>
          item.name?.toLowerCase().includes(keyword) ||
          item.description?.toLowerCase().includes(keyword),
      );
    }

    // 分类过滤
    if (params.categoryName) {
      filteredFavorites = filteredFavorites.filter(
        (item) => item.categoryName === params.categoryName,
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

  // 真实API调用代码（待启用）
  // return request<FavoriteAPI.Result_PageInfo_FavoriteModule__>('/api/v1/favorites', {
  //   method: 'GET',
  //   params: {
  //     ...params,
  //   },
  //   ...(options || {}),
  // });
}

/** 添加收藏 POST /api/v1/favorite */
export async function addFavorite(
  body?: FavoriteAPI.AddFavoriteRequest,
  options?: { [key: string]: any },
): Promise<FavoriteAPI.Result_FavoriteModule_> {
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
    const newFavorite: FavoriteAPI.FavoriteModule = {
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

  // 真实API调用代码（待启用）
  // return request<FavoriteAPI.Result_FavoriteModule_>('/api/v1/favorite', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: body,
  //   ...(options || {}),
  // });
}

/** 检查模块是否已收藏 GET /api/v1/favorite/check/${param0} */
export async function checkFavorite(
  params: {
    // path
    /** 模块ID */
    moduleId?: string;
  },
  options?: { [key: string]: any },
): Promise<FavoriteAPI.Result_boolean_> {
  // 模拟网络延迟
  await simulateNetworkDelay(100);

  try {
    if (!params.moduleId) {
      return {
        success: false,
        errorMessage: '模块ID不能为空',
        data: false,
      };
    }

    const favorites = getFavoritesFromStorage();
    const isFavorite = favorites.some((fav) => fav.id === params.moduleId);

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

  // 真实API调用代码（待启用）
  // const { moduleId: param0 } = params;
  // return request<FavoriteAPI.Result_boolean_>(`/api/v1/favorite/check/${param0}`, {
  //   method: 'GET',
  //   params: { ...params },
  //   ...(options || {}),
  // });
}

/** 移除单个收藏 DELETE /api/v1/favorite/${param0} */
export async function removeFavorite(
  params: {
    // path
    /** 模块ID */
    moduleId?: string;
  },
  options?: { [key: string]: any },
): Promise<FavoriteAPI.Result_string_> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    if (!params.moduleId) {
      return {
        success: false,
        errorMessage: '模块ID不能为空',
      };
    }

    const favorites = getFavoritesFromStorage();
    const initialLength = favorites.length;
    const newFavorites = favorites.filter((fav) => fav.id !== params.moduleId);

    if (newFavorites.length === initialLength) {
      return {
        success: false,
        errorMessage: '收藏项不存在',
      };
    }

    saveFavoritesToStorage(newFavorites);

    return {
      success: true,
      data: '移除收藏成功',
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `移除收藏失败: ${error}`,
    };
  }

  // 真实API调用代码（待启用）
  // const { moduleId: param0 } = params;
  // return request<FavoriteAPI.Result_string_>(`/api/v1/favorite/${param0}`, {
  //   method: 'DELETE',
  //   params: { ...params },
  //   ...(options || {}),
  // });
}

/** 批量移除收藏 DELETE /api/v1/favorites */
export async function removeFavoritesBatch(
  body?: {
    /** 模块ID列表 */
    moduleIds?: string[];
  },
  options?: { [key: string]: any },
): Promise<FavoriteAPI.Result_string_> {
  // 模拟网络延迟
  await simulateNetworkDelay();

  try {
    if (!body?.moduleIds || body.moduleIds.length === 0) {
      return {
        success: false,
        errorMessage: '模块ID列表不能为空',
      };
    }

    const favorites = getFavoritesFromStorage();
    const newFavorites = favorites.filter(
      (fav) => !body.moduleIds!.includes(fav.id!),
    );
    const removedCount = favorites.length - newFavorites.length;

    saveFavoritesToStorage(newFavorites);

    return {
      success: true,
      data: `成功移除 ${removedCount} 个收藏项`,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `批量移除收藏失败: ${error}`,
    };
  }

  // 真实API调用代码（待启用）
  // return request<FavoriteAPI.Result_string_>('/api/v1/favorites', {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: body,
  //   ...(options || {}),
  // });
}
