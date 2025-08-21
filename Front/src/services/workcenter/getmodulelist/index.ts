// 该文件为工作中心模块列表获取模块导出文件

import * as GetModuleListController from './GetModuleListController';

export const { getModuleList } = GetModuleListController;

// 导出类型定义
export type {
  GetModuleListRequest,
  GetModuleListResponse,
  ModuleItem,
} from './typings';
