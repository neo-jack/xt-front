// 系统信息服务类型定义

// 系统信息
export interface SystemInfo {
  version: string;
  name: string;
  description: string;
}

// /api/system/info响应
export interface SystemInfoResponse {
  code: number;
  data: SystemInfo | null;
  msg: string | null;
}
