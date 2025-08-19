// 用户令牌刷新服务类型定义

// /api/user/refresh请求
export interface RefreshTokenRequest {
  refreshToken: string;
}


// /api/user/refresh响应
export interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenData | null;
  msg: string | null;
}

// 刷新令牌数据
export interface RefreshTokenData {
  AccessToken: string;
  RefreshToken?: string; // 可选，有些系统会返回新的刷新令牌
  ExpiresIn: number;
}
