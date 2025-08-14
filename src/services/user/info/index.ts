// 该文件为用户信息模块导出文件

import * as InfoController from './InfoController';

export const { getUserInfo } = InfoController;

// 导出类型定义
export type {
  UserInfoResponse,
} from './typings';
