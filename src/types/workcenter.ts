/* 
    工作模块接口定义 
*/

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

export interface FavoriteModule extends SubModule {
  /** 所属分类名称，用于标识模块来源 */
  categoryName: string;

  /** 收藏添加时间，ISO格式字符串 */
  addedAt: string;
}

export interface WorkCenterState {
  /** 当前选中的菜单分类键值 */
  selectedCategoryKey: string;

  /** 用户收藏的模块列表 */
  favoriteModules: FavoriteModule[];

  /** 正在运行的模块ID列表，用于状态标识和管理 */
  runningModules: string[];
}

export interface ModuleStartConfig {
  /** 要启动的模块ID */
  moduleId: string;

  /** 模块名称，用于日志和通知 */
  moduleName: string;

  /** 启动端口号 */
  port: number;

  /** 启动命令，用于执行模块启动 */
  command: string;

  /** 项目路径，指向模块的完整文件系统路径 */
  projectPath: string;
}
