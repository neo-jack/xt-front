// 请求 post请求 /api/user/getheadshotlist

// Mock 头像列表请求接口类型定义
interface MockHeadshotListRequest {
    body: {
        //用户id
        id: string;
    };
}

// 头像信息接口
interface HeadshotInfo {
    name: string;
    url: string;
    id: number;
}

// Mock 响应接口类型定义
interface MockHeadshotListResponse {
    code: number;
    data: HeadshotInfo[];
    msg: string;
}



// 获取可用的头像列表（模拟数据）
const getAvailableHeadshots = (): HeadshotInfo[] => {
    // 使用实际存在的头像文件
    const mockHeadshots: HeadshotInfo[] = [
        {
            id: 1,
            name: '02.png',
            url: '/datebash/acators/02.png'  // 当前用户头像，会被前端过滤掉
        },
        {
            id: 2,
            name: '03.png', 
            url: '/datebash/acators/03.png'
        },
        {
            id: 3,
            name: '01.png',
            url: '/datebash/acators/01.png'
        },
        {
            id: 4,
            name: '04.png',
            url: '/datebash/acators/04.png'
        },
        
    ];

    return mockHeadshots;
};

// 实现头像列表获取的mock API
export default {
    'POST /api/user/getheadshotlist': (
        req: MockHeadshotListRequest,
        res: any
    ) => {
        const { id } = req.body;
        
        console.log(`Mock: 获取用户 ${id} 的头像列表`);

        try {
            // 获取可用的头像列表
            const headshots = getAvailableHeadshots();

            const response: MockHeadshotListResponse = {
                code: 200,
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
