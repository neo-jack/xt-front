// 移除收藏服务类型定义

// 移除收藏请求参数（与mock API保持一致）
export interface RemoveFavoriteRequest {
  modulesid: string; // 模块ID
}

// 移除收藏响应（与mock API保持一致）
export interface RemoveFavoriteResponse {
  code: number; // 成功返回0 失败返回其他
  data: null;
  msg: string;
}

// 服务层统一结果类型
export interface RemoveFavoriteResult {
  success: boolean;
  message: string;
}
