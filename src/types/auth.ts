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

// 登录状态
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

// 登录表单数据
export interface LoginFormData {
    //用户名
    username: string;
    //密码
    password: string;
}

// 登录响应
export interface LoginResponse {
    //请求是否成功
    success: boolean;
    //响应数据
    data: {
        //用户信息
        user: UserInfo;
        //认证令牌
        token: string;
        //令牌过期时间（毫秒）
        expires: number;
    };
    //响应消息
    message?: string;
}

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