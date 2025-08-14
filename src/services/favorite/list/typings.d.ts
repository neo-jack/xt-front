// 收藏列表服务类型定义

// 收藏模块信息
export interface FavoriteModule {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  port?: string;
  projectPath?: string;
  categoryName?: string;
  isFavorite?: boolean;
  addedAt?: string;
}

// 分页信息
export interface PageInfo {
  current: number;
  pageSize: number;
  total: number;
  list: FavoriteModule[];
}

// /api/v1/favorites请求参数
export interface QueryFavoriteListRequest {
  keyword?: string;
  categoryName?: string;
  current?: number;
  pageSize?: number;
}

// /api/v1/favorites响应
export interface QueryFavoriteListResponse {
  success: boolean;
  data: PageInfo;
  errorMessage?: string;
}
