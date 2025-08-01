// 认证模块相关类型定义
// 按照syt-admin-final的模式，将所有auth相关的类型统一管理在这里

// ==================== 基础类型 ====================

// 用户信息
export interface UserInfo {
    //用户id
    id: string;
    //用户名
    username: string;
    //邮箱
    email: string;
    //头像
    avatar: string;
    // 角色
    roles: string[];
}

// 登录表单数据
export interface LoginFormData {
    //用户名
    username: string;
    //密码
    password: string;
}

// ==================== 状态管理类型 ====================

// 登录状态（用于Redux store）
export interface AuthState {
    //当前用户信息
    user: UserInfo | null;
    //认证令牌
    token: string | null;
    //是否已登录
    isLoggedIn: boolean;
    //加载状态
    loading: boolean;
}

// ==================== API响应类型 ====================

// 通用API响应格式
export interface ApiResponse<T = any> {
    //请求是否成功
    success: boolean;
    //响应数据
    data: T;
    //响应消息
    message?: string;
    //状态码
    code?: number;
}

// 登录响应数据结构
export interface LoginResponseData {
    //用户信息
    user: UserInfo;
    //认证令牌
    token: string;
    //令牌过期时间（毫秒）
    expires: number;
}

// 登录API响应类型
export interface LoginApiResponse extends ApiResponse<LoginResponseData> {}

// 获取用户信息API响应类型
export interface GetUserInfoApiResponse extends ApiResponse<UserInfo> {}

// 登出API响应类型
export interface LogoutApiResponse extends ApiResponse<null> {}

// 验证token API响应类型
export interface ValidateTokenApiResponse extends ApiResponse<UserInfo> {}