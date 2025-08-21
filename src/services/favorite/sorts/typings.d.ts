// 收藏排序服务类型定义

// 收藏排序请求参数（与mock API保持一致）
export interface SortFavoriteRequest {
  sortOrder: string[]; // 模块ID数组，按新顺序排列
}

// 收藏排序响应（与mock API保持一致）
export interface SortFavoriteResponse {
  code: number; // 成功返回0 失败返回其他
  data: null;
  msg: string;
}

// 服务层统一结果类型
export interface SortFavoriteResult {
  success: boolean;
  message: string;
}
