// 服务模块统一导出文件

// 用户相关服务
export * from './user/login';
export * from './user/logout';
export * from './user/info';
export * from './user/refresh';
export * from './user/getheadshotlist';
export * from './user/avatorupload';

// 系统相关服务
export * from './system/info';

// 收藏相关服务
export { queryFavoriteList, type QueryFavoriteListRequest, type QueryFavoriteListResponse, type PageInfo } from './favorite/list';
export { addFavorite, type AddFavoriteRequest, type AddFavoriteResponse } from './favorite/add';
export { checkFavorite, type CheckFavoriteRequest, type CheckFavoriteResponse } from './favorite/check';
export type { FavoriteModule } from './favorite/list';

// 为了保持向后兼容，提供一些别名导出
export { login } from './user/login';
export { logout } from './user/logout';
export { getUserInfo } from './user/info';
export { refreshToken } from './user/refresh';
export { getSystemInfo } from './system/info';
export { uploadAvatar } from './user/avatorupload';

