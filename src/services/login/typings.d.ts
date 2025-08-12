// 登录服务类型定义

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 用户信息
export interface UserInfo {
  USER_ID: number;
  USER_NAME: string;
  USER_AVATAR: string;
  USER_ROLE: string;
  HOSPITAL_CNAME: string;
  HOSPITAL_ID: number;
}

// 登录响应数据
export interface LoginData {
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  USER: UserInfo;
}

// 登录响应
export interface LoginResponse {
  code: number;
  data: LoginData | null;
  msg: string | null;
}

// 刷新令牌请求参数
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 刷新令牌响应数据
export interface RefreshTokenData {
  AccessToken: string;
  RefreshToken?: string; // 可选，有些系统会返回新的刷新令牌
  ExpiresIn: number;
}

// 刷新令牌响应
export interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenData | null;
  msg: string | null;
}

// 通用 API 响应
export interface ApiResponse<T = any> {
  code: number;
  data: T | null;
  msg: string | null;
}

export interface LogoutRequest {
  user_id: number;
}