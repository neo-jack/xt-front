// 工作中心模块列表获取服务类型定义

// /api/workcenter/getmodulelist请求
export interface GetModuleListRequest {
  name: string; // 菜单栏名
}

// /api/workcenter/getmodulelist响应
export interface GetModuleListResponse {
  code: number;
  data: ModuleItem[];
  msg: string;
}

// 模块项目数据
export interface ModuleItem {
  id: number;
  /** 模块代码 */
  moduleCode: string;
  /** 名称 */
  moduleName: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon: string;
  /** 端口 */
  port: number;
  /** url */
  url: string;
  /** 状态 */
  status: number;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 分类名称 */
  categoryName: string;
}
