// 用户登出服务类型定义

// /api/user/logout请求
export interface LogoutRequest {
  user_id: number;
}

// /api/user/logout响应
export interface LogoutResponse {
  code: number;
  data: any | null;
  msg: string | null;
}
