// 系统信息数据定义
export interface SystemInfoData {
  clientip: string; // 客户端地址
  servedomain: string; // 服务器域名
  version: string; // 程序版本
  major: number; // 大版本号
}

// 系统信息数据
export const systemInfo: SystemInfoData = {
  clientip: 'localhost',
  servedomain: 'localhost',
  version: '0.2',
  major: 0,
};
