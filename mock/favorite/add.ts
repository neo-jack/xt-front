// 请求 post请求 /api/favorite/add
import fs from 'fs';
import path from 'path';
import { parseTokenUserId } from '../utils/tokenid';
import { WORK_CENTER_MENUS } from '../datebash/modulelist/index';
import { userFavorites } from '../datebash/favorite/index';
import type { FavoriteItem } from '../datebash/favorite/index';

// MOCK_CONFIG 配置
const ADD_FAVORITE_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 添加收藏请求定义
interface MockAddFavoriteRequest {
    body: {
        modulesid: string; // 模块id
    };
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应定义
interface MockAddFavoriteResponse {
    code: number; // 成功返回0 失败返回其他
    data: null;
    msg: string;
}

/**
 * 根据模块ID查找模块信息
 */
const findModuleById = (moduleId: string): FavoriteItem | null => {
    // 遍历所有分类查找模块
    for (const category of WORK_CENTER_MENUS) {
        const module = category.subModules.find(subModule => subModule.id === moduleId);
        if (module) {
            // 转换为FavoriteItem格式
            return {
                id: module.id,
                name: module.name,
                description: module.description || '',
                icon: module.icon || 'AppstoreOutlined',
                port: module.port || 3000,
                url: `http://localhost:${module.port || 3000}`,
                sort: 1 // 新添加的模块默认排序为1，表示最前面
            };
        }
    }
    return null;
};

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
  /** 排序 */
  sort?: number;
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
        console.log(`[addFavorite] 收藏数据文件已更新: ${filePath}`);
    } catch (error) {
        console.error(`[addFavorite] 更新收藏数据文件失败:`, error);
    }
};

/**
 * 更新用户已有收藏的排序（将所有排序+1）
 * @param userFavoriteData 用户收藏数据
 */
const incrementExistingFavoritesSort = (userFavoriteData: any): void => {
    userFavoriteData.favorites.forEach((favorite: any) => {
        if (favorite.sort) {
            favorite.sort += 1;
        } else {
            // 如果没有sort字段，设置为2（因为新添加的是1）
            favorite.sort = 2;
        }
    });
    console.log(`[addFavorite] 已将现有收藏的排序全部+1`);
};

/**
 * 添加模块到用户收藏（更新模拟数据库）
 */
const addModuleToFavorites = (userId: number, module: FavoriteItem): boolean => {
    // 查找用户是否已存在收藏列表
    let userFavoriteData = userFavorites.find(user => user.userId === userId);
    
    if (!userFavoriteData) {
        // 如果用户不存在，创建新的收藏列表
        userFavoriteData = {
            userId,
            favorites: []
        };
        userFavorites.push(userFavoriteData);
    }
    
    // 检查模块是否已经收藏
    const isAlreadyFavorite = userFavoriteData.favorites.some(fav => fav.id === module.id);
    if (isAlreadyFavorite) {
        console.log(`[addFavorite] 模块 ${module.id} 已经存在于用户 ${userId} 的收藏中`);
        return false;
    }
    
    // 先将现有收藏的排序全部+1
    incrementExistingFavoritesSort(userFavoriteData);
    
    // 添加新模块到收藏列表（排序为1，排在最前面）
    userFavoriteData.favorites.push(module);
    console.log(`[addFavorite] 成功添加模块 ${module.id} 到用户 ${userId} 的收藏中，排序为1（最前面）`);
    
    // 按排序重新排列
    userFavoriteData.favorites.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
    
    // 更新文件数据
    updateFavoriteFile(userFavorites);
    console.log(`[addFavorite] 模拟数据库文件已更新，用户 ${userId} 现在有 ${userFavoriteData.favorites.length} 个收藏`);
    console.log(`[addFavorite] 新的排序: ${userFavoriteData.favorites.map((fav: any) => `${fav.id}(${fav.sort})`).join(', ')}`);
    
    return true;
};

/**
 * 获取延迟时间
 */
const getDelayTime = (): number => {
    return ADD_FAVORITE_MOCK_CONFIG.net ? ADD_FAVORITE_MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 */
const shouldReturnError = (): boolean => {
    return ADD_FAVORITE_MOCK_CONFIG.net && Math.random() < ADD_FAVORITE_MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return ADD_FAVORITE_MOCK_CONFIG.net && Math.random() < ADD_FAVORITE_MOCK_CONFIG.timeoutRate;
};

export default {
    'POST /api/favorite/add': (req: MockAddFavoriteRequest, res: any) => {
        console.log('[addFavorite] 收到添加收藏请求');
        console.log('[addFavorite] 请求参数:', req.body);
        console.log('[addFavorite] 请求头:', req.headers);
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[addFavorite] 模拟请求超时');
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[addFavorite] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                const { modulesid } = req.body;
                const { authorization } = req.headers;
                
                // 验证请求参数
                if (!modulesid) {
                    console.log('[addFavorite] 缺少模块ID参数');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '请提供模块ID参数'
                    });
                }
                
                if (!authorization) {
                    console.log('[addFavorite] 缺少授权token');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '请提供授权token'
                    });
                }
                
                // 从token中解析用户ID
                const userId = parseTokenUserId(authorization);
                if (!userId) {
                    console.log('[addFavorite] token解析失败，无法获取用户ID');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: 'token无效，请重新登录'
                    });
                }
                
                console.log(`[addFavorite] 解析到用户ID: ${userId}`);
                
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[addFavorite] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: null,
                        msg: '添加收藏失败，请稍后重试'
                    });
                }
                
                // 根据模块ID查找模块信息
                const module = findModuleById(modulesid);
                if (!module) {
                    console.log(`[addFavorite] 未找到ID为"${modulesid}"的模块`);
                    return res.json({
                        code: -1,
                        data: null,
                        msg: `未找到ID为"${modulesid}"的模块`
                    });
                }
                
                console.log(`[addFavorite] 找到模块:`, module);
                
                // 添加模块到用户收藏（更新模拟数据库）
                const success = addModuleToFavorites(userId, module);
                
                if (!success) {
                    console.log(`[addFavorite] 模块已存在于收藏中`);
                    return res.json({
                        code: 0,
                        data: null,
                        msg: '模块已在收藏中'
                    });
                }
                
                console.log(`[addFavorite] 成功添加模块到收藏，模拟数据库已更新`);
                
                // 返回成功响应
                const response: MockAddFavoriteResponse = {
                    code: 0,
                    data: null,
                    msg: '添加收藏成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[addFavorite] 处理请求时发生错误:', error);
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
