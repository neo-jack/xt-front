// 用户登录服务类型定义

// /api/user/login请求
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

// 登录数据
export interface LoginData {
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  USER: UserInfo;
}

// /api/user/login响应
export interface LoginResponse {
  code: number;
  data: LoginData | null;
  msg: string | null;
}
