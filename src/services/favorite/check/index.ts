// 该文件为检查收藏状态模块导出文件

import * as CheckController from './CheckController';

export const { checkFavorite } = CheckController;

// 导出类型定义
export type {
  CheckFavoriteRequest,
  CheckFavoriteResponse,
} from './typings';
