// 请求 post请求 /api/favorite/get
import { parseTokenUserId } from '../utils/tokenid';
import type { FavoriteItem } from '../datebash/favorite/index';
import { getPersistentFavorites } from '../datebash/favorite/storage';

// MOCK_CONFIG 配置
const GET_FAVORITE_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 获取收藏列表请求定义
interface MockGetFavoriteRequest {
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 获取收藏列表响应定义
interface MockGetFavoriteResponse {
    code: number; // 成功返回0 失败返回其他
    data: FavoriteItem[];
    msg: string;
}

/**
 * 获取用户收藏列表
 */
const getUserFavorites = (userId: number): FavoriteItem[] => {
    // 获取持久化的收藏数据
    const userFavorites = getPersistentFavorites();
    
    // 查找用户收藏数据
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        console.log(`[getFavorite] 用户 ${userId} 没有收藏数据`);
        return [];
    }
    
    console.log(`[getFavorite] 用户 ${userId} 有 ${userFavoriteData.favorites.length} 个收藏`);
    return userFavoriteData.favorites;
};

/**
 * 获取延迟时间
 */
const getDelayTime = (): number => {
    return GET_FAVORITE_MOCK_CONFIG.net ? GET_FAVORITE_MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 */
const shouldReturnError = (): boolean => {
    return GET_FAVORITE_MOCK_CONFIG.net && Math.random() < GET_FAVORITE_MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return GET_FAVORITE_MOCK_CONFIG.net && Math.random() < GET_FAVORITE_MOCK_CONFIG.timeoutRate;
};

export default {
    'POST /api/favorite/get': (req: MockGetFavoriteRequest, res: any) => {
        console.log('[getFavorite] 收到获取收藏列表请求');
        console.log('[getFavorite] 请求头:', req.headers);
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[getFavorite] 模拟请求超时');
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[getFavorite] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                const { authorization } = req.headers;
                
                // 验证授权token
                if (!authorization) {
                    console.log('[getFavorite] 缺少授权token');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '请提供授权token'
                    });
                }
                
                // 从token中解析用户ID
                const userId = parseTokenUserId(authorization);
                if (!userId) {
                    console.log('[getFavorite] token解析失败，无法获取用户ID');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: 'token无效，请重新登录'
                    });
                }
                
                console.log(`[getFavorite] 解析到用户ID: ${userId}`);
                
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[getFavorite] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '获取收藏列表失败，请稍后重试'
                    });
                }
                
                // 获取用户收藏列表
                const favoriteList = getUserFavorites(userId);
                
                console.log(`[getFavorite] 成功获取收藏列表，共 ${favoriteList.length} 项`);
                
                // 返回成功响应
                const response: MockGetFavoriteResponse = {
                    code: 0,
                    data: favoriteList,
                    msg: '获取收藏列表成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[getFavorite] 处理请求时发生错误:', error);
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