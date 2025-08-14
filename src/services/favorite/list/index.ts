// 该文件为收藏列表模块导出文件

import * as ListController from './ListController';

export const { queryFavoriteList } = ListController;

// 导出类型定义
export type {
  QueryFavoriteListRequest,
  QueryFavoriteListResponse,
  FavoriteModule,
  PageInfo,
} from './typings';
