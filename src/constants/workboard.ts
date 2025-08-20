
// 工作看板类型定义

/** 子模块接口 */
export interface SubModule {
  /** 主键 */
  id: string;
  /** 名称 */
  name: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon?: string;
  /** 端口 */
  port?: number;
  /** 项目路径 */
  projectPath?: string;
  /** 是否收藏 */
  isFavorite?: boolean;
}

/** 菜单分类接口 */
export interface MenuCategory {
  /** 分类唯一标识符，通常对应文件夹名称 */
  id: string;
  /** 分类显示名称 */
  name: string;
  /** 分类键值，用于菜单选择和路由 */
  key: string;
  /** 分类图标名称，用于菜单展示 */
  icon: string;
  /** 该分类下包含的所有子模块列表 */
  subModules: SubModule[];
}

/** 工作中心菜单类型 */
export type WorkCenterMenus = MenuCategory[];
