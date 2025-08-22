// 菜单常量和类型定义

/**
 * 菜单项类型定义
 */
export interface MenuItem {
  SYNERGY_ID: string | null;
  MENU_NO: string;
  SUB_MENU: MenuItem[];
  MENU_NAME: string;
  MENU_ICON: string | null;
  MENU_URL: string | null;
  SYS_MENU: string | null;
  PARENT_CODE: string;
  MENU_MODULE: string | null;
  MENU_SORT: string | null;
  BECALL_MODULE_ID: string | null;
}

/**
 * 菜单状态常量
 */
export const MENU_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * 默认菜单路径
 */
export const DEFAULT_MENU_PATH = '/xt/workboard';

/**
 * 菜单类型常量
 */
export const MENU_TYPES = {
  MAIN: 'main',      // 主菜单
  SUB: 'sub',        // 子菜单
  LEAF: 'leaf',      // 叶子菜单
};
