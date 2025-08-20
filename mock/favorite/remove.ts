// 请求 post请求 /api/favorite/remove
import fs from 'fs';
import path from 'path';
import { parseTokenUserId } from '../utils/tokenid';
import { WORK_CENTER_MENUS } from '../datebash/modulelist/index';
import { userFavorites } from '../datebash/favorite/index';
import type { FavoriteItem } from '../datebash/favorite/index';

// MOCK_CONFIG 配置
const REMOVE_FAVORITE_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 取消收藏请求定义
interface MockRemoveFavoriteRequest {
    body: {
        modulesid: string; // 模块id
    };
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 取消收藏响应定义
interface MockRemoveFavoriteResponse {
    code: number; // 成功返回0 失败返回其他
    data: null;
    msg: string;
}

/**
 * 更新收藏数据文件
 * @param updatedUserFavorites 更新后的用户收藏数据
 */
const updateFavoriteFile = (updatedUserFavorites: any[]): void => {
    try {
        const filePath = path.join(process.cwd(), 'mock/datebash/favorite/index.ts');
        
        // 生成新的文件内容
        const fileContent = `// 收藏项目类型定义
export interface FavoriteItem {
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
}

// 用户收藏数据类型定义
export interface UserFavoriteData {
  userId: number;
  favorites: FavoriteItem[];
}

// 用户收藏数据
export const userFavorites: UserFavoriteData[] = ${JSON.stringify(updatedUserFavorites, null, 2)};

`;

        fs.writeFileSync(filePath, fileContent, 'utf-8');
        console.log(`[removeFavorite] 收藏数据文件已更新: ${filePath}`);
    } catch (error) {
        console.error(`[removeFavorite] 更新收藏数据文件失败:`, error);
    }
};

/**
 * 从用户收藏中移除模块（更新模拟数据库）
 */
const removeModuleFromFavorites = (userId: number, moduleId: string): boolean => {
    // 查找用户收藏列表
    const userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        console.log(`[removeFavorite] 用户 ${userId} 不存在收藏列表`);
        return false;
    }
    
    // 查找要移除的模块在收藏中的索引
    const moduleIndex = userFavoriteData.favorites.findIndex(fav => fav.id === moduleId);
    
    if (moduleIndex === -1) {
        console.log(`[removeFavorite] 模块 ${moduleId} 不在用户 ${userId} 的收藏中`);
        return false;
    }
    
    // 从收藏列表中移除模块
    userFavoriteData.favorites.splice(moduleIndex, 1);
    console.log(`[removeFavorite] 成功从用户 ${userId} 的收藏中移除模块 ${moduleId}`);
    
    // 更新文件数据
    updateFavoriteFile(userFavorites);
    console.log(`[removeFavorite] 模拟数据库文件已更新，用户 ${userId} 现在有 ${userFavoriteData.favorites.length} 个收藏`);
    
    return true;
};

/**
 * 获取延迟时间
 */
const getDelayTime = (): number => {
    return REMOVE_FAVORITE_MOCK_CONFIG.net ? REMOVE_FAVORITE_MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 */
const shouldReturnError = (): boolean => {
    return REMOVE_FAVORITE_MOCK_CONFIG.net && Math.random() < REMOVE_FAVORITE_MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return REMOVE_FAVORITE_MOCK_CONFIG.net && Math.random() < REMOVE_FAVORITE_MOCK_CONFIG.timeoutRate;
};

export default {
    'POST /api/favorite/remove': (req: MockRemoveFavoriteRequest, res: any) => {
        console.log('[removeFavorite] 收到取消收藏请求');
        console.log('[removeFavorite] 请求参数:', req.body);
        console.log('[removeFavorite] 请求头:', req.headers);
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[removeFavorite] 模拟请求超时');
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[removeFavorite] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                const { modulesid } = req.body;
                const { authorization } = req.headers;
                
                // 验证请求参数
                if (!modulesid) {
                    console.log('[removeFavorite] 缺少模块ID参数');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '请提供模块ID参数'
                    });
                }
                
                if (!authorization) {
                    console.log('[removeFavorite] 缺少授权token');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '请提供授权token'
                    });
                }
                
                // 从token中解析用户ID
                const userId = parseTokenUserId(authorization);
                if (!userId) {
                    console.log('[removeFavorite] token解析失败，无法获取用户ID');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: 'token无效，请重新登录'
                    });
                }
                
                console.log(`[removeFavorite] 解析到用户ID: ${userId}`);
                
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[removeFavorite] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '取消收藏失败，请稍后重试'
                    });
                }
                
                // 从用户收藏中移除模块（更新模拟数据库）
                const success = removeModuleFromFavorites(userId, modulesid);
                
                if (!success) {
                    console.log(`[removeFavorite] 模块不存在于收藏中或用户收藏列表不存在`);
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '模块不在收藏中'
                    });
                }
                
                console.log(`[removeFavorite] 成功从收藏中移除模块，模拟数据库已更新`);
                
                // 返回成功响应
                const response: MockRemoveFavoriteResponse = {
                    code: 0,
                    data: null,
                    msg: '取消收藏成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[removeFavorite] 处理请求时发生错误:', error);
                return res.json({
                    code: 500,
                    data: null,
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