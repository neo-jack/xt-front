//请求 get请求 /api/workcenter/getclass
import { WORK_CENTER_MENUS } from '../../../Datebash/modulelist/index';

//MOCK_CONFIG 配置
const GETCLASS_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 0,                // 无延迟
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};


// Mock 请求定义
interface MockGetClassRequest {
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应定义
interface MockGetClassResponse {
    code: number;
    data: ClassItem[];
    msg: string;
}

export interface ClassItem {
    id: string;
    name: string;
    icon: string;
}

/**
 * 获取延迟时间
 */
const getDelayTime = (): number => {
    return GETCLASS_MOCK_CONFIG.net ? GETCLASS_MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 */
const shouldReturnError = (): boolean => {
    return GETCLASS_MOCK_CONFIG.net && Math.random() < GETCLASS_MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return GETCLASS_MOCK_CONFIG.net && Math.random() < GETCLASS_MOCK_CONFIG.timeoutRate;
};


export default {
    'GET /api/workcenter/getclass': (req: MockGetClassRequest, res: any) => {
        console.log('[getclass] 收到获取分类请求');
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[getclass] 模拟请求超时');
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[getclass] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[getclass] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '获取分类失败，请稍后重试'
                    });
                }
                
                // 从modulelist中提取MenuCategory的id、name和icon
                const classItems: ClassItem[] = WORK_CENTER_MENUS.map(category => ({
                    id: category.id,
                    name: category.name,
                    icon: category.icon
                }));
                
                console.log('[getclass] 返回分类数据，共', classItems.length, '个分类');
                
                // 返回成功响应
                const response: MockGetClassResponse = {
                    code: 0,
                    data: classItems,
                    msg: '获取分类成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[getclass] 处理请求时发生错误:', error);
                return res.json({
                    code: 500,
                    data: [],
                    msg: '服务器内部错误'
                });
            }
        };
        
        // 根据配置决定是否延迟执行
        if (delayTime > 0) {
            setTimeout(processRequest, delayTime);
        } else {
            processRequest();
        }
    }
};

