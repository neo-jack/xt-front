// 系统服务类型定义

// /api/system/info响应
export interface SystemInfo {
  clientip: string; // 客户端地址
  servedomain: string; // 服务器域名
  version: string; // 程序版本
  major: number; // 大版本号
}

export interface SystemInfoResponse {
  code: number; // 响应状态码：0-成功，-1-失败，-2-网络错误
  data: SystemInfo;
  msg: string | null; // 响应消息
}

// 通用结果结构
export interface ApiResponse<T = any> {
  code: number;
  data: T | null;
  msg: string | null;
}
