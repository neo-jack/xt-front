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
  id: string;
  /** 名称 */
  name: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon: string;
  /** 端口 */
  port: number;
  /** url */
  url: string;
}
