// 请求 post请求 /api/user/getheadshotlist
import { HeadshotInfo, mockHeadshots } from '../datebash/acators';
import { parseTokenUserId } from '../utils/tokenid';

// Mock 头像列表请求接口类型定义
interface MockHeadshotListRequest {
    headers: {
        authorization?: string; // Bearer token
    };
    body: {
        // 不再需要id字段，从token中解析
    };
}

// Mock 响应接口类型定义
interface MockHeadshotListResponse {
    code: number;
    data: HeadshotInfo[];
    msg: string;
}



// 获取可用的头像列表（模拟数据）
const getAvailableHeadshots = (): HeadshotInfo[] => {
    return mockHeadshots;
};

// 实现头像列表获取的mock API
export default {
    'POST /api/user/getheadshotlist': (
        req: MockHeadshotListRequest,
        res: any
    ) => {
        const authHeader = req.headers.authorization;
        
        console.log(`Mock: 收到获取头像列表请求`);

        try {
            // 从token解析用户ID
            const userId = parseTokenUserId(authHeader || '');
            
            if (!userId) {
                const errorResponse: MockHeadshotListResponse = {
                    code: 401,
                    data: [],
                    msg: '无效的token或用户ID'
                };
                return res.status(401).json(errorResponse);
            }

            console.log(`Mock: 获取用户 ${userId} 的头像列表`);

            // 获取可用的头像列表
            const headshots = getAvailableHeadshots();

            const response: MockHeadshotListResponse = {
                code: 0,
                data: headshots,
                msg: '获取头像列表成功'
            };

            console.log(`Mock: 返回 ${headshots.length} 个头像选项`);
            
            // 模拟网络延迟
            setTimeout(() => {
                res.json(response);
            }, 100);

        } catch (error) {
            console.error('Mock: 获取头像列表失败:', error);
            
            const errorResponse: MockHeadshotListResponse = {
                code: 500,
                data: [],
                msg: '获取头像列表失败'
            };
            
            res.status(500).json(errorResponse);
        }
    }
};
