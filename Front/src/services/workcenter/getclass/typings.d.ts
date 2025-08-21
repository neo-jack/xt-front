// 工作中心分类获取服务类型定义

// /api/workcenter/getclass请求
export interface GetClassRequest {
  // 请求不需要额外参数，通过Authorization header传递token
}

// /api/workcenter/getclass响应
export interface GetClassResponse {
  code: number;
  data: ClassItem[];
  msg: string;
}

// 分类项目数据
export interface ClassItem {
  id: string;
  name: string;
  icon: string;
}
