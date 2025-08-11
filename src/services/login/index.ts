/* eslint-disable */
// 该文件为登录模块导出文件

import * as LoginController from './LoginController';

// 导出类型定义
export type {
  ApiResponse,
  LoginData,
  LoginRequest,
  LoginResponse,
  UserInfo,
} from './typings';

// 导出控制器
export default {
  LoginController,
};

// 导出登录相关函数
export const { login, logout, getUserInfo } = LoginController;
