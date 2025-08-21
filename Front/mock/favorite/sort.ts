// 收藏排序接口 Mock
// 请求: POST /api/favorite/sort
// 功能: 更新用户收藏模块的排序

import { parseTokenUserId } from '../utils/tokenid';
import { userFavorites } from '../../../Datebash/favorite/index';
import type { FavoriteItem } from '../../../Datebash/favorite/index';

// MOCK_CONFIG 配置
const SORT_FAVORITE_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 500,              // 延迟时间(ms)
    errorRate: 0,            // 0%错误率 - 调试期间禁用随机错误
    timeoutRate: 0,          // 0%超时率 - 调试期间禁用随机超时
};

// Mock 收藏排序请求定义
interface MockSortFavoriteRequest {
    body: string[];           // 模块ID数组，按新顺序排列
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 收藏排序响应定义
interface MockSortFavoriteResponse {
    code: number;             // 成功返回0，失败返回其他
    data: null;
    msg: string;
}

/**
 * 获取用户收藏列表
 * @param userId 用户ID
 * @returns 用户收藏列表
 */
const getUserFavorites = (userId: number): FavoriteItem[] => {
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        console.log(`[sortFavorite] 用户 ${userId} 没有收藏数据`);
        return [];
    }
    
    console.log(`[sortFavorite] 用户 ${userId} 有 ${userFavoriteData.favorites.length} 个收藏`);
    return userFavoriteData.favorites;
};

/**
 * 更新用户收藏排序
 * @param userId 用户ID
 * @param newOrder 新的排序数组
 * @returns 是否更新成功
 */
const updateUserFavoritesSort = (userId: number, newOrder: string[]): boolean => {
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        console.log(`[sortFavorite] 用户 ${userId} 不存在`);
        return false;
    }

    // 验证所有ID都存在于用户收藏中
    const userFavoriteIds = userFavoriteData.favorites.map(item => item.id);
    const invalidIds = newOrder.filter(id => !userFavoriteIds.includes(id));
    
    if (invalidIds.length > 0) {
        console.log(`[sortFavorite] 无效的模块ID: ${invalidIds.join(', ')}`);
        return false;
    }

    // 更新排序
    newOrder.forEach((moduleId, newIndex) => {
        const favorite = userFavoriteData.favorites.find(item => item.id === moduleId);
        if (favorite) {
            favorite.sort = newIndex + 1; // sort 字段从 1 开始
        }
    });

    // 按新顺序排序
    userFavoriteData.favorites.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    
    console.log(`[sortFavorite] 用户 ${userId} 收藏排序更新成功`);
    return true;
};

/**
 * 处理收藏排序请求
 * @param request 排序请求数据
 * @returns 排序响应结果
 */
export const handleSortFavorite = async (request: MockSortFavoriteRequest): Promise<MockSortFavoriteResponse> => {
    try {
        // 模拟网络延迟
        if (SORT_FAVORITE_MOCK_CONFIG.delay > 0) {
            await new Promise(resolve => setTimeout(resolve, SORT_FAVORITE_MOCK_CONFIG.delay));
        }

        // 模拟错误
        if (Math.random() < SORT_FAVORITE_MOCK_CONFIG.errorRate) {
            return {
                code: 500,
                data: null,
                msg: "服务器内部错误"
            };
        }

        // 模拟超时
        if (Math.random() < SORT_FAVORITE_MOCK_CONFIG.timeoutRate) {
            throw new Error("请求超时");
        }

        const { body: newOrder, headers } = request;

        // 验证请求数据
        if (!Array.isArray(newOrder) || newOrder.length === 0) {
            return {
                code: 400,
                data: null,
                msg: "请求参数错误：排序数组不能为空"
            };
        }

        // 验证授权并解析用户ID
        if (!headers.authorization) {
            return {
                code: 401,
                data: null,
                msg: "未授权访问"
            };
        }

        const userId = parseTokenUserId(headers.authorization);
        if (!userId) {
            return {
                code: 401,
                data: null,
                msg: "Token无效或已过期"
            };
        }

        // 获取用户收藏数据
        const userFavoriteList = getUserFavorites(userId);
        if (userFavoriteList.length === 0) {
            return {
                code: 404,
                data: null,
                msg: "用户暂无收藏数据"
            };
        }

        // 验证排序数组的模块ID是否都在用户收藏中
        const userFavoriteIds = userFavoriteList.map(item => item.id);
        const invalidIds = newOrder.filter(id => !userFavoriteIds.includes(id));
        
        if (invalidIds.length > 0) {
            return {
                code: 400,
                data: null,
                msg: `无效的模块ID: ${invalidIds.join(', ')}`
            };
        }

        // 检查排序数组长度是否与用户收藏数量一致
        if (newOrder.length !== userFavoriteList.length) {
            return {
                code: 400,
                data: null,
                msg: "排序数组长度与收藏数量不一致"
            };
        }

        // 更新排序
        const success = updateUserFavoritesSort(userId, newOrder);
        if (!success) {
            return {
                code: 500,
                data: null,
                msg: "更新收藏排序失败"
            };
        }

        // 返回成功响应
        return {
            code: 0,
            data: null,
            msg: "收藏排序更新成功"
        };

    } catch (error) {
        console.error('[sortFavorite] 收藏排序处理失败:', error);
        
        if (error instanceof Error && error.message === "请求超时") {
            return {
                code: 408,
                data: null,
                msg: "请求超时，请重试"
            };
        }

        return {
            code: 500,
            data: null,
            msg: "服务器内部错误，请稍后重试"
        };
    }
};

/**
 * 获取指定用户的当前收藏排序
 * @param userId 用户ID
 * @returns 当前收藏模块的排序数组
 */
const getCurrentFavoriteOrder = (userId: number): string[] => {
    const userFavoriteList = getUserFavorites(userId);
    return userFavoriteList
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
        .map(item => item.id);
};

/**
 * 重置指定用户的收藏排序到默认状态
 * @param userId 用户ID
 * @returns 是否重置成功
 */
const resetFavoriteOrder = (userId: number): boolean => {
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        console.log(`[resetFavoriteOrder] 用户 ${userId} 不存在`);
        return false;
    }

    userFavoriteData.favorites.forEach((item, index) => {
        item.sort = index + 1; // sort 字段从 1 开始
    });

    console.log(`[resetFavoriteOrder] 用户 ${userId} 收藏排序已重置`);
    return true;
};

// UMI.js Mock API 导出
export default {
    'POST /api/favorite/sort': (req: any, res: any) => {
        console.log('[sortFavorite] 收到排序请求');
        console.log('[sortFavorite] 请求体:', req.body);
        console.log('[sortFavorite] 请求头:', req.headers);

        // 构造请求对象
        const request: MockSortFavoriteRequest = {
            body: req.body, // 直接使用请求体作为排序数组
            headers: req.headers
        };

        // 调用处理函数
        handleSortFavorite(request)
            .then(response => {
                console.log('[sortFavorite] 处理完成，返回响应:', response);
                res.json(response);
            })
            .catch(error => {
                console.error('[sortFavorite] 处理请求时发生错误:', error);
                res.json({
                    code: 500,
                    data: null,
                    msg: '服务器内部错误'
                });
            });
    }
};

// 导出辅助函数供其他模块使用
export { getCurrentFavoriteOrder, resetFavoriteOrder };