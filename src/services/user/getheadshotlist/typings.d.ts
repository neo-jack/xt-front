// 头像列表服务类型定义

// /api/user/getheadshotlist请求
export interface GetHeadshotListRequest {
  id: string; // 用户ID
}

// 头像信息
export interface HeadshotInfo {
  id: number;
  name: string;
  url: string;
}

// /api/user/getheadshotlist响应
export interface GetHeadshotListResponse {
  code: number;
  data: HeadshotInfo[];
  msg: string;
}
