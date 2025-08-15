// 请求 GET请求 /api/user/info

import { mockUsers } from './users';

// Mock 用户信息请求接口类型定义
interface MockUserInfoRequest {
    headers: {
        authorization?: string;
    };
}

// 用户信息接口
interface UserInfo {
    USER_ID: number;
    USER_NAME: string;
    USER_AVATAR: string;
    USER_ROLE: string;
    HOSPITAL_CNAME: string;
    HOSPITAL_ID: number;
}

// Mock 响应接口类型定义
interface MockUserInfoResponse {
    code: number;
    data: UserInfo | null;
    msg: string | null;
}

// 从token中提取用户ID（简单模拟）
const extractUserIdFromToken = (token: string): number | null => {
    try {
        // 简单解析mock token
        if (token.startsWith('Bearer ')) {
            token = token.substring(7);
        }
        
        // 对于mock token，我们从token中解析用户ID
        const parts = token.split('.');
        if (parts.length >= 2) {
            const payload = JSON.parse(atob(parts[1]));
            return payload.userId || null;
        }
    } catch (error) {
        console.error('解析token失败:', error);
    }
    return null;
};

// 实现用户信息获取的mock API
export default {
    'GET /api/user/info': (
        req: MockUserInfoRequest,
        res: any
    ) => {
        const authorization = req.headers.authorization;
        
        console.log(`Mock: 获取用户信息，token: ${authorization}`);

        try {
            // 验证token
            if (!authorization) {
                const errorResponse: MockUserInfoResponse = {
                    code: 401,
                    data: null,
                    msg: '未提供认证token'
                };
                return res.status(401).json(errorResponse);
            }

            // 提取用户ID
            const userId = extractUserIdFromToken(authorization);
            if (!userId) {
                const errorResponse: MockUserInfoResponse = {
                    code: 401,
                    data: null,
                    msg: '无效的token'
                };
                return res.status(401).json(errorResponse);
            }

            // 查找用户
            const user = mockUsers.find(u => u.USER_ID === userId);
            if (!user) {
                const errorResponse: MockUserInfoResponse = {
                    code: 404,
                    data: null,
                    msg: '用户不存在'
                };
                return res.status(404).json(errorResponse);
            }

            const response: MockUserInfoResponse = {
                code: 200,
                data: {
                    USER_ID: user.USER_ID,
                    USER_NAME: user.USER_NAME,
                    USER_AVATAR: user.USER_AVATAR,
                    USER_ROLE: user.USER_ROLE,
                    HOSPITAL_CNAME: user.HOSPITAL_CNAME,
                    HOSPITAL_ID: user.HOSPITAL_ID,
                },
                msg: '获取用户信息成功'
            };

            console.log(`Mock: 返回用户信息，用户ID: ${userId}`);
            
            // 模拟网络延迟
            setTimeout(() => {
                res.json(response);
            }, 100);

        } catch (error) {
            console.error('Mock: 获取用户信息失败:', error);
            
            const errorResponse: MockUserInfoResponse = {
                code: 500,
                data: null,
                msg: '获取用户信息失败'
            };
            
            res.status(500).json(errorResponse);
        }
    }
};
