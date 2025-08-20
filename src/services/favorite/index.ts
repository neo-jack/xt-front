// 收藏功能服务统一导出

// 导出各个子服务
export * as AddFavoriteService from './add';
export * as RemoveFavoriteService from './remove';
export * as GetFavoriteService from './get';

// 导出类型
export type { FavoriteItem } from './get/typings';
export type { AddFavoriteResult } from './add/typings';
export type { RemoveFavoriteResult } from './remove/typings';
export type { GetFavoriteListResult } from './get/typings';

// 便捷的API函数导出
export { addFavorite } from './add/AddController';
export { removeFavorite } from './remove/RemoveController';
export { getFavoriteList } from './get/GetController';
