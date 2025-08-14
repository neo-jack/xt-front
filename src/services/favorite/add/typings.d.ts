// 添加收藏服务类型定义

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

// /api/v1/favorite请求参数
export interface AddFavoriteRequest {
  moduleId?: string;
  moduleName?: string;
  description?: string;
  icon?: string;
  port?: string;
  projectPath?: string;
  categoryName?: string;
}

// /api/v1/favorite响应
export interface AddFavoriteResponse {
  success: boolean;
  data?: FavoriteModule;
  errorMessage?: string;
}
