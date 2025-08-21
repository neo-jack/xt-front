// 该文件为用户登出模块导出文件

import * as LogoutController from './LogoutController';

export const { logout } = LogoutController;

// 导出类型定义
export type {
  LogoutRequest,
  LogoutResponse,
} from './typings';
