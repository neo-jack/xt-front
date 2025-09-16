// 添加收藏服务类型定义

// 添加收藏请求参数（与后端API保持一致）
export interface AddFavoriteRequest {
  modulesid: string; // 模块ID
  name?: string; // 模块名称
  description?: string; // 模块描述
  icon?: string; // 图标
  port?: number; // 端口
  url?: string; // 访问URL
}

// 添加收藏响应（与mock API保持一致）
export interface AddFavoriteResponse {
  code: number; // 成功返回0 失败返回其他
  data: null;
  msg: string;
}

// 服务层统一结果类型
export interface AddFavoriteResult {
  success: boolean;
  message: string;
}
