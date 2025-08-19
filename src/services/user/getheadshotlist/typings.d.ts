// 头像列表服务类型定义

// /api/user/getheadshotlist请求
export interface GetHeadshotListRequest {
  // 不再需要id字段，从token中解析用户ID
}


// /api/user/getheadshotlist响应
export interface GetHeadshotListResponse {
  code: number;
  data: HeadshotInfo[];
  msg: string;
}

// 头像信息
export interface HeadshotInfo {
  id: number;
  name: string;
  url: string;
  userId: number;  // 添加用户ID字段
}
