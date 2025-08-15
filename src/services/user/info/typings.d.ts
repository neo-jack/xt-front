// 用户信息服务类型定义

// 用户信息数据
export interface UserInfoData {
  USER_ID: number;
  USER_NAME: string;
  USER_AVATAR: string;
  USER_ROLE: string;
  HOSPITAL_CNAME: string;
  HOSPITAL_ID: number;
}

// /api/user/info响应
export interface UserInfoResponse {
  code: number;
  data: UserInfoData | null;
  msg: string | null;
}
