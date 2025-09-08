// 该文件为获取菜单模块导出文件

import * as GetmuesController from './GetmuesController';

export const { getMenus } = GetmuesController;

// 导出类型定义
export type {
  GetMenuRequest,
  GetMenuResponse,
} from './typings';
