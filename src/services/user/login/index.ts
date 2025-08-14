// 该文件为用户登录模块导出文件

import * as LoginController from './LoginController';

export const { login } = LoginController;

// 导出类型定义
export type {
  LoginRequest,
  LoginResponse,
  LoginData,
  UserInfo,
} from './typings';
