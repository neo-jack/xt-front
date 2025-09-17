// 收藏排序服务类型定义

// 收藏排序请求参数（与后端API保持一致）
export interface SortFavoriteRequest {
  sortOrder: string[]; // 模块ID数组，按新顺序排列
}

// 后端期望的排序项格式
export interface SortItem {
  id: string; // 模块ID
  sort: number; // 排序序号（从1开始）
}

// 后端期望的请求格式
export interface BackendSortRequest {
  sortItems: SortItem[];
}

// 收藏排序响应（与后端API保持一致）
export interface SortFavoriteResponse {
  code: number; // 成功返回0 失败返回其他
  data: string | null; // 后端返回成功消息字符串
  msg: string;
}

// 服务层统一结果类型
export interface SortFavoriteResult {
  success: boolean;
  message: string;
}
