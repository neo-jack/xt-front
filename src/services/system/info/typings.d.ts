// 系统信息服务类型定义

// /api/system/info响应
export interface SystemInfoResponse {
  code: number;
  data: SystemInfo | null;
  msg: string | null;
}


export interface SystemInfo {
  clientip: string; // 客户端地址
  servedomain: string; // 服务器域名
  version: string; // 程序版本
  major: number; // 大版本号
}
