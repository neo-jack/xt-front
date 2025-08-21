// 该文件为系统信息模块导出文件

import * as InfoController from './InfoController';

export const { getSystemInfo } = InfoController;

// 导出类型定义
export type {
  SystemInfoResponse,
  SystemInfo,
} from './typings';
