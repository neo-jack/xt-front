// 该文件为头像列表模块导出文件

import * as GetheadshotlistController from './GetheadshotlistController';

export const { getHeadshotList } = GetheadshotlistController;

// 导出类型定义
export type {
  GetHeadshotListRequest,
  GetHeadshotListResponse,
  HeadshotInfo,
} from './typings';
