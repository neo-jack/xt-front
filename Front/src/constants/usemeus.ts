// 菜单数据模型和操作
import { useState, useCallback, useEffect } from 'react';
import { getMenus } from '../services/user/getmues';
import { MenuItem, MENU_STATUS } from './meus';

/**
 * 菜单状态接口
 */
interface MenuState {
  menuList: MenuItem[];
  status: string;
  error: string | null;
}

/**
 * 菜单钩子 - 用于获取和管理菜单数据
 * @returns 菜单状态和操作方法
 */
export function useMenu() {
  // 菜单状态
  const [menuState, setMenuState] = useState<MenuState>({
    menuList: [],
    status: MENU_STATUS.LOADING,
    error: null,
  });

  // 获取菜单数据
  const fetchMenus = useCallback(async () => {
    setMenuState(prev => ({ ...prev, status: MENU_STATUS.LOADING }));
    
    try {
      const response = await getMenus();
      
      if (response.code === 0) {
        setMenuState({
          menuList: response.data,
          status: MENU_STATUS.SUCCESS,
          error: null,
        });
      } else {
        setMenuState({
          menuList: [],
          status: MENU_STATUS.ERROR,
          error: response.msg || '获取菜单失败',
        });
      }
    } catch (error) {
      setMenuState({
        menuList: [],
        status: MENU_STATUS.ERROR,
        error: error instanceof Error ? error.message : '获取菜单出错',
      });
    }
  }, []);

  // 组件挂载时获取菜单
  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  // 判断菜单项是否有权限访问
  const hasMenuPermission = useCallback((menuNo: string): boolean => {
    const { menuList } = menuState;
    
    if (!menuList || menuList.length === 0) {
      return false;
    }
    
    // 直接检查顶级菜单
    const hasDirectPermission = menuList.some(menu => menu.MENU_NO === menuNo);
    if (hasDirectPermission) {
      return true;
    }
    
    // 递归检查子菜单
    return menuList.some(menu => {
      if (menu.SUB_MENU && menu.SUB_MENU.length > 0) {
        return hasMenuPermissionInList(menuNo, menu.SUB_MENU);
      }
      return false;
    });
  }, [menuState]);

  // 根据菜单编号查找菜单项
  const findMenuByNo = useCallback((menuNo: string): MenuItem | undefined => {
    const { menuList } = menuState;
    return findMenuByNoInList(menuNo, menuList);
  }, [menuState]);

  // 根据URL查找菜单项
  const findMenuByUrl = useCallback((url: string): MenuItem | undefined => {
    const { menuList } = menuState;
    return findMenuByUrlInList(url, menuList);
  }, [menuState]);

  // 获取菜单的完整路径
  const getMenuPath = useCallback((menuNo: string): MenuItem[] => {
    const { menuList } = menuState;
    return getMenuPathInList(menuNo, menuList);
  }, [menuState]);

  // 获取所有叶子节点菜单
  const getLeafMenus = useCallback((): MenuItem[] => {
    const { menuList } = menuState;
    return getLeafMenusFromList(menuList);
  }, [menuState]);

  // 刷新菜单数据
  const refreshMenus = useCallback(() => {
    fetchMenus();
  }, [fetchMenus]);

  return {
    ...menuState,
    hasMenuPermission,
    findMenuByNo,
    findMenuByUrl,
    getMenuPath,
    getLeafMenus,
    refreshMenus,
  };
}

// 辅助函数 - 在菜单列表中判断权限
function hasMenuPermissionInList(menuNo: string, menuList: MenuItem[]): boolean {
  if (!menuList || menuList.length === 0) {
    return false;
  }
  
  // 直接检查菜单
  const hasDirectPermission = menuList.some(menu => menu.MENU_NO === menuNo);
  if (hasDirectPermission) {
    return true;
  }
  
  // 递归检查子菜单
  return menuList.some(menu => {
    if (menu.SUB_MENU && menu.SUB_MENU.length > 0) {
      return hasMenuPermissionInList(menuNo, menu.SUB_MENU);
    }
    return false;
  });
}

// 辅助函数 - 在菜单列表中查找菜单项
function findMenuByNoInList(menuNo: string, menuList: MenuItem[]): MenuItem | undefined {
  if (!menuList || menuList.length === 0) {
    return undefined;
  }
  
  // 直接查找菜单
  const directMenu = menuList.find(menu => menu.MENU_NO === menuNo);
  if (directMenu) {
    return directMenu;
  }
  
  // 递归查找子菜单
  for (const menu of menuList) {
    if (menu.SUB_MENU && menu.SUB_MENU.length > 0) {
      const subMenu = findMenuByNoInList(menuNo, menu.SUB_MENU);
      if (subMenu) {
        return subMenu;
      }
    }
  }
  
  return undefined;
}

// 辅助函数 - 根据URL查找菜单项
function findMenuByUrlInList(url: string, menuList: MenuItem[]): MenuItem | undefined {
  if (!menuList || menuList.length === 0 || !url) {
    return undefined;
  }
  
  // 直接查找菜单
  const directMenu = menuList.find(menu => menu.MENU_URL === url);
  if (directMenu) {
    return directMenu;
  }
  
  // 递归查找子菜单
  for (const menu of menuList) {
    if (menu.SUB_MENU && menu.SUB_MENU.length > 0) {
      const subMenu = findMenuByUrlInList(url, menu.SUB_MENU);
      if (subMenu) {
        return subMenu;
      }
    }
  }
  
  return undefined;
}

// 辅助函数 - 获取菜单路径
function getMenuPathInList(menuNo: string, menuList: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  
  function findPath(currentMenuNo: string, currentList: MenuItem[], path: MenuItem[]): boolean {
    for (const menu of currentList) {
      // 将当前菜单添加到路径中
      const currentPath = [...path, menu];
      
      // 如果找到目标菜单
      if (menu.MENU_NO === currentMenuNo) {
        result.push(...currentPath);
        return true;
      }
      
      // 递归查找子菜单
      if (menu.SUB_MENU && menu.SUB_MENU.length > 0) {
        if (findPath(currentMenuNo, menu.SUB_MENU, currentPath)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  findPath(menuNo, menuList, []);
  return result;
}

// 辅助函数 - 获取所有叶子节点菜单
function getLeafMenusFromList(menuList: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  
  function findLeafMenus(list: MenuItem[]) {
    for (const menu of list) {
      if (!menu.SUB_MENU || menu.SUB_MENU.length === 0) {
        result.push(menu);
      } else {
        findLeafMenus(menu.SUB_MENU);
      }
    }
  }
  
  findLeafMenus(menuList);
  return result;
}
