// 登录服务类型定义

// /api/user/login请求
export interface LoginRequest {
  username: string;
  password: string;
}

// /api/user/login响应
export interface UserInfo {
  USER_ID: number;
  USER_NAME: string;
  USER_AVATAR: string;
  USER_ROLE: string;
  HOSPITAL_CNAME: string;
  HOSPITAL_ID: number;
}

export interface LoginData {
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  USER: UserInfo;
}

export interface LoginResponse {
  code: number;
  data: LoginData | null;
  msg: string | null;
}

// /api/user/refreshToken请求
export interface RefreshTokenRequest {
  refreshToken: string;
}

// /api/user/refreshToken响应
export interface RefreshTokenData {
  AccessToken: string;
  RefreshToken?: string; // 可选，有些系统会返回新的刷新令牌
  ExpiresIn: number;
}

export interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenData | null;
  msg: string | null;
}


// /api/user/logout请求
export interface LogoutRequest {
  user_id: number;
}

// /api/user/logout响应
export interface ApiResponse<T = any> {
  code: number;
  data: T | null;
  msg: string | null;
}
