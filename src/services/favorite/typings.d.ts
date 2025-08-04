/* eslint-disable */
// 该文件由开发人员手动创建，定义收藏功能相关的类型

declare namespace FavoriteAPI {
  interface PageInfo {
    /** 当前页码 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 总数量 */
    total?: number;
    /** 数据列表 */
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_FavoriteModule_ {
    /** 当前页码 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 总数量 */
    total?: number;
    /** 收藏模块列表 */
    list?: Array<FavoriteModule>;
  }

  interface Result {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMessage?: string;
    /** 响应数据 */
    data?: Record<string, any>;
  }

  interface Result_PageInfo_FavoriteModule__ {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMessage?: string;
    /** 分页收藏数据 */
    data?: PageInfo_FavoriteModule_;
  }

  interface Result_FavoriteModule_ {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMessage?: string;
    /** 收藏模块数据 */
    data?: FavoriteModule;
  }

  interface Result_boolean_ {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMessage?: string;
    /** 操作结果 */
    data?: boolean;
  }

  interface Result_string_ {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMessage?: string;
    /** 字符串结果 */
    data?: string;
  }

  /** 收藏模块信息 */
  interface FavoriteModule {
    /** 模块唯一标识符 */
    id?: string;
    /** 模块显示名称 */
    name?: string;
    /** 模块功能描述 */
    description?: string;
    /** 模块图标名称 */
    icon?: string;
    /** 模块运行端口号 */
    port?: number;
    /** 模块项目路径 */
    projectPath?: string;
    /** 是否已收藏 */
    isFavorite?: boolean;
    /** 所属分类名称 */
    categoryName?: string;
    /** 收藏添加时间 */
    addedAt?: string;
  }

  /** 添加收藏请求参数 */
  interface AddFavoriteRequest {
    /** 模块ID */
    moduleId?: string;
    /** 模块名称 */
    moduleName?: string;
    /** 模块描述 */
    description?: string;
    /** 模块图标 */
    icon?: string;
    /** 运行端口 */
    port?: number;
    /** 项目路径 */
    projectPath?: string;
    /** 所属分类名称 */
    categoryName?: string;
  }

  /** 收藏查询参数 */
  interface QueryFavoriteParams {
    /** 关键词搜索 */
    keyword?: string;
    /** 分类过滤 */
    categoryName?: string;
    /** 当前页码 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
  }

  type definitions_0 = null;
}
