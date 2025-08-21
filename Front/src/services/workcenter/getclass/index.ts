// 该文件为工作中心分类获取模块导出文件

import * as GetClassController from './GetClassController';

export const { getClass } = GetClassController;

// 导出类型定义
export type {
  GetClassRequest,
  GetClassResponse,
  ClassItem,
} from './typings';
