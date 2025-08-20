//请求 post请求 /api/workcenter/getmodulelist
import { WORK_CENTER_MENUS } from '../datebash/modulelist/index';
import { userFavorites } from '../datebash/favorite/index';
import { parseTokenUserId } from '../utils/tokenid';

//MOCK_CONFIG 配置
const GETMODULELIST_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};


/**
 * 根据端口生成URL
 */


const generateModuleUrl = (port: number): string => {
    return `http://localhost:${port}`;
};

/**
 * 检查模块是否被用户收藏
 */
const isModuleFavorited = (userId: number, moduleId: string): boolean => {
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    if (!userFavoriteData) {
        return false;
    }
    return userFavoriteData.favorites.some(fav => fav.id === moduleId);
};

// Mock 请求定义
interface MockGetModuleListRequest {
    body: {
       name: string; // 菜单栏名
    };
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应定义
interface MockGetModuleListResponse {
    code: number;
    data: ModuleItem[];
    msg: string;
}

export interface ModuleItem {
    id: string;
    /** 名称 */
    name: string;
    /** 描述 */
    description: string;
    /** 图标 */
    icon: string;
    /** 端口 */
    port: number;
    /** url */
    url: string;
    /** 是否收藏 */
    isFavorite: boolean;
}
/**
 * 获取延迟时间
 */
const getDelayTime = (): number => {
    return GETMODULELIST_MOCK_CONFIG.net ? GETMODULELIST_MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 */
const shouldReturnError = (): boolean => {
    return GETMODULELIST_MOCK_CONFIG.net && Math.random() < GETMODULELIST_MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return GETMODULELIST_MOCK_CONFIG.net && Math.random() < GETMODULELIST_MOCK_CONFIG.timeoutRate;
};


export default {
    'POST /api/workcenter/getmodulelist': (req: MockGetModuleListRequest, res: any) => {
        console.log('[getmodulelist] 收到获取模块列表请求');
        console.log('[getmodulelist] 请求参数:', req.body);
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[getmodulelist] 模拟请求超时');
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[getmodulelist] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                const { name } = req.body;
                
                if (!name) {
                    console.log('[getmodulelist] 缺少菜单名参数');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '请提供菜单名参数'
                    });
                }

                // 解析用户ID
                const userId = parseTokenUserId(req.headers.authorization || '');
                console.log(`[getmodulelist] 解析到用户ID: ${userId}`);
                
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[getmodulelist] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '获取模块列表失败，请稍后重试'
                    });
                }
                
                // 根据菜单名查找对应的分类
                const category = WORK_CENTER_MENUS.find(cat => cat.name === name);
                
                if (!category) {
                    console.log('[getmodulelist] 未找到对应的菜单分类:', name);
                    return res.json({
                        code: -1,
                        data: [],
                        msg: `未找到名为"${name}"的菜单分类`
                    });
                }
                
                // 将SubModule转换为ModuleItem格式
                const moduleItems: ModuleItem[] = category.subModules.map(module => ({
                    id: module.id,
                    name: module.name,
                    description: module.description,
                    icon: module.icon || 'AppstoreOutlined',
                    port: module.port || 3000,
                    url: generateModuleUrl(module.port || 3000),
                    isFavorite: userId && userId > 0 ? isModuleFavorited(userId, module.id) : false
                }));
                
                console.log(`[getmodulelist] 找到分类"${name}"，返回${moduleItems.length}个模块`);
                
                // 返回成功响应
                const response: MockGetModuleListResponse = {
                    code: 0,
                    data: moduleItems,
                    msg: '获取模块列表成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[getmodulelist] 处理请求时发生错误:', error);
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

