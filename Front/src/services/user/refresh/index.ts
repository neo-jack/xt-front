// 该文件为用户令牌刷新模块导出文件

import * as RefreshController from './RefreshController';

export const { refreshToken } = RefreshController;

// 导出类型定义
export type {
  RefreshTokenRequest,
  RefreshTokenResponse,
  RefreshTokenData,
} from './typings';
