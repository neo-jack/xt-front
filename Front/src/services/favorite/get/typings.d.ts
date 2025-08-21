// 获取收藏列表服务类型定义

// 收藏项信息（与mock/datebash/favorite/index.ts中的FavoriteItem保持一致）
export interface FavoriteItem {
  id: string;
  /** 名称 */
  name: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon: string;
  /** 端口 */
  port: number;
  /** url */
  url: string;
}

// 获取收藏列表请求参数（与mock API保持一致）
export interface GetFavoriteListRequest {
  // 该API只需要token，不需要body参数
}

// 获取收藏列表响应（与mock API保持一致）
export interface GetFavoriteListResponse {
  code: number; // 成功返回0 失败返回其他
  data: FavoriteItem[];
  msg: string;
}

// 服务层统一结果类型
export interface GetFavoriteListResult {
  success: boolean;
  message: string;
  data: FavoriteItem[];
}
