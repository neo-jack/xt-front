/* eslint-disable */
// 该文件为登录模块类型定义

declare namespace LOGIN {
  // 基础响应格式
  interface Result<T = any> {
    success?: boolean;
    errorMessage?: string;
    data?: T;
  }

  // 用户信息
  interface UserInfo {
    /** 用户ID */
    id?: string;
    /** 用户名 */
    username?: string;
    /** 邮箱 */
    email?: string;
    /** 头像 */
    avatar?: string;
    /** 角色列表 */
    roles?: string[];
  }

  // 登录表单数据
  interface LoginFormData {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
  }

  // 登录响应数据
  interface LoginResponseData {
    /** 用户信息 */
    user?: UserInfo;
    /** 认证令牌 */
    token?: string;
    /** 令牌过期时间（毫秒） */
    expires?: number;
  }

  // 认证状态
  interface AuthState {
    /** 当前用户信息 */
    user?: UserInfo | null;
    /** 认证令牌 */
    token?: string | null;
    /** 是否已登录 */
    isLoggedIn?: boolean;
    /** 加载状态 */
    loading?: boolean;
  }

  // 登录API响应类型
  interface Result_LoginResponseData_ {
    success?: boolean;
    errorMessage?: string;
    data?: LoginResponseData;
  }

  // 获取用户信息API响应类型
  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  // 登出API响应类型
  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  // 验证token API响应类型
  interface Result_ValidateToken_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  type definitions_0 = null;
}
