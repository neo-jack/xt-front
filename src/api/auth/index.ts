import { request } from '@/utils/http';
import type {
  LoginFormData,
  LoginApiResponse,
  GetUserInfoApiResponse,
  LogoutApiResponse,
  ValidateTokenApiResponse
} from './model';

// 认证相关API服务
export const authApi = {
  // 用户登录
  login: (data: LoginFormData): Promise<LoginApiResponse> => {
    return request.post('/auth/login', data);
  },

  // 获取当前用户信息
  getCurrentUser: (): Promise<GetUserInfoApiResponse> => {
    return request.get('/auth/currentUser');
  },

  // 用户登出
  logout: (): Promise<LogoutApiResponse> => {
    return request.post('/auth/logout');
  },

  // 验证token有效性
  validateToken: (): Promise<ValidateTokenApiResponse> => {
    return request.get('/auth/validate');
  },
};

// 默认导出
export default authApi;