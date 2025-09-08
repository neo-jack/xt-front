// 用户登出服务类型定义

// /api/user/logout请求
export interface LogoutRequest {
  // 不再需要user_id字段，从token中解析用户ID
}

// /api/user/logout响应
export interface LogoutResponse {
  code: number;
  data: any | null;
  msg: string | null;
}
