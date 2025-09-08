// 获取菜单服务类型定义
import { MenuItem } from '../../../constants/meus';

// /api/user/getmues 请求
export interface GetMenuRequest {
  // 不需要额外参数，使用 Authorization 头部传递 token
}

// /api/user/getmues 响应
export interface GetMenuResponse {
  code: number;
  data: MenuItem[];
  msg: string;
}
