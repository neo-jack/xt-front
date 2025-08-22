import { request } from '@umijs/max';
import type {
  GetMenuResponse,
} from './typings';

/**
 * 获取用户菜单
 * @returns Promise<GetMenuResponse> 菜单数据响应
 * @description 根据当前用户的 token 获取对应的菜单列表
 */
export async function getMenus(): Promise<GetMenuResponse> {
  console.log('[Menu Service] 开始获取菜单请求');
  
  return request<GetMenuResponse>('/api/user/getmues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // 不需要额外数据，token 会通过请求拦截器自动添加到 headers
  });
}
