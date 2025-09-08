// 请求 post请求 /api/user/getmues
import { menuDatabase, userMenuPermissions, MenuData, MenuItem } from '../../../Datebash/menu/index';
import { parseTokenUserId, isValidTokenFormat, isTokenExpired } from '../utils/tokenid';

console.log('[Mock Import] 菜单数据库导入状态:', {
  menuDatabaseExists: !!menuDatabase,
  menuDatabaseLength: menuDatabase?.length || 0,
  userPermissionsExists: !!userMenuPermissions,
  userPermissionsKeys: Object.keys(userMenuPermissions || {})
});

// MOCK_CONFIG 配置
const GET_MENU_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 获取菜单栏请求定义
interface MockGetMenuRequest {
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应定义
interface MockGetMenuResponse {
    code: number; // 成功返回0 失败返回其他
    data: MenuItem[];
    msg: string;
}


// 根据用户ID获取菜单数据
const getMenuDataByUserId = (userId: number): MenuItem[] => {
    const userMenuData = menuDatabase.find(item => item.USER_ID === userId);
    if (!userMenuData) {
        return [];
    }
    
    const allowedMenus = userMenuPermissions[userId] || [];
    return userMenuData.MENU_DATA.filter(menu => allowedMenus.includes(menu.MENU_NO));
};

// Mock 获取菜单接口实现
export const mockGetMenu = async (request: MockGetMenuRequest): Promise<MockGetMenuResponse> => {
    console.log('[mockGetMenu] 开始处理获取菜单请求');
    
    // 模拟网络延迟
    if (GET_MENU_MOCK_CONFIG.net) {
        await new Promise(resolve => setTimeout(resolve, GET_MENU_MOCK_CONFIG.delay));
    }
    
    // 模拟网络错误（仅在启用网络模拟时）
    if (GET_MENU_MOCK_CONFIG.net && Math.random() < GET_MENU_MOCK_CONFIG.errorRate) {
        console.log('[mockGetMenu] 模拟网络错误');
        throw new Error('网络连接失败');
    }
    
    // 模拟超时（仅在启用网络模拟时）
    if (GET_MENU_MOCK_CONFIG.net && Math.random() < GET_MENU_MOCK_CONFIG.timeoutRate) {
        console.log('[mockGetMenu] 模拟网络超时');
        throw new Error('请求超时');
    }
    
    try {
        // 验证token
        const token = request.headers.authorization;
        if (!token) {
            console.log('[mockGetMenu] 缺少授权token');
            return {
                code: 401,
                data: [],
                msg: '缺少授权token'
            };
        }
        
        // 验证token格式
        if (!isValidTokenFormat(token)) {
            console.log('[mockGetMenu] token格式无效');
            return {
                code: 401,
                data: [],
                msg: 'token格式无效'
            };
        }
        
        // 检查token是否过期
        if (isTokenExpired(token)) {
            console.log('[mockGetMenu] token已过期');
            return {
                code: 401,
                data: [],
                msg: 'token已过期，请重新登录'
            };
        }
        
        // 解析用户ID
        const userId = parseTokenUserId(token);
        if (!userId) {
            console.log('[mockGetMenu] 无法解析用户ID');
            return {
                code: 401,
                data: [],
                msg: '无效的用户token'
            };
        }
        
        console.log('[mockGetMenu] 解析到用户ID:', userId);
        
        // 获取用户菜单数据
        const menuData = getMenuDataByUserId(userId);
        
        console.log('[mockGetMenu] 获取到菜单数据条数:', menuData.length);
        
        return {
            code: 0,
            data: menuData,
            msg: '获取菜单成功'
        };
        
    } catch (error) {
        console.error('[mockGetMenu] 处理请求时发生错误:', error);
        return {
            code: 500,
            data: [],
            msg: '服务器内部错误'
        };
    }
};

// Umi Mock 导出
export default {
  'POST /api/user/getmues': async (req: any, res: any) => {
    console.log('[Mock] 接收到获取菜单请求');
    console.log('[Mock] 请求头:', JSON.stringify(req.headers, null, 2));
    
    try {
      const mockRequest: MockGetMenuRequest = {
        headers: {
          authorization: req.headers.authorization
        }
      };
      
      console.log('[Mock] 准备调用 mockGetMenu，authorization:', req.headers.authorization ? 'exists' : 'missing');
      
      const response = await mockGetMenu(mockRequest);
      
      console.log('[Mock] 返回菜单响应:', {
        code: response.code,
        dataLength: response.data.length,
        msg: response.msg
      });
      
      res.json(response);
    } catch (error) {
      console.error('[Mock] 获取菜单时发生错误:', error);
      console.error('[Mock] 错误详情:', error instanceof Error ? error.message : 'Unknown error');
      console.error('[Mock] 错误堆栈:', error instanceof Error ? error.stack : 'No stack');
      res.json({
        code: 500,
        data: [],
        msg: '服务器内部错误: ' + (error instanceof Error ? error.message : 'Unknown error')
      });
    }
  }
};
