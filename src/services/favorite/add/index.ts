// 该文件为添加收藏模块导出文件

import * as AddController from './AddController';

export const { addFavorite } = AddController;

// 导出类型定义
export type {
  AddFavoriteRequest,
  AddFavoriteResponse,
  FavoriteModule,
} from './typings';
