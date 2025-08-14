// 检查收藏状态服务类型定义

// /api/v1/favorite/check/{moduleId}请求参数
export interface CheckFavoriteRequest {
  moduleId?: string;
}

// /api/v1/favorite/check/{moduleId}响应
export interface CheckFavoriteResponse {
  success: boolean;
  data: boolean;
  errorMessage?: string;
}
