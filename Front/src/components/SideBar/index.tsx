// 侧边栏导航组件
import { Menu, MenuProps, Spin, Alert } from 'antd';
import { FC, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenu } from '@/constants/usemeus';
import { getIconComponent } from '@/components/Card/iconMap';
import { MenuItem as ApiMenuItem, MENU_STATUS } from '@/constants/meus';
import useUser from '@/models/useuser';
import './index.less';

interface AntdMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: AntdMenuItem[];
}

const SideBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 直接使用 useMenu hook，让请求拦截器处理 token 验证
  const {
    menuList,
    status,
    error,
    refreshMenus,
  } = useMenu();

  // 将 API 菜单数据转换为 Antd Menu 组件所需的格式
  const convertApiMenuToAntdMenu = (apiMenuItems: ApiMenuItem[]): AntdMenuItem[] => {
    return apiMenuItems.map((item) => {
      const menuItem: AntdMenuItem = {
        key: item.MENU_URL || item.MENU_NO,
        label: item.MENU_NAME,
        icon: item.MENU_ICON ? getIconComponent(item.MENU_ICON, { fontSize: '16px', color: 'currentColor' }) : undefined,
      };

      // 递归处理子菜单
      if (item.SUB_MENU && item.SUB_MENU.length > 0) {
        menuItem.children = convertApiMenuToAntdMenu(item.SUB_MENU);
      }

      return menuItem;
    });
  };

  // 获取菜单项配置
  const menuItems: AntdMenuItem[] = useMemo(() => {
    if (status === MENU_STATUS.SUCCESS && menuList.length > 0) {
      return convertApiMenuToAntdMenu(menuList);
    }
    
    // 如果没有 token 或者菜单加载失败，返回空数组
    return [];
  }, [menuList, status]);

  // 获取当前应该选中的菜单key
  const getSelectedKeys = (): string[] => {
    const currentPath = location.pathname;
    
    // 首先尝试直接匹配路径
    if (menuItems.some(item => item?.key === currentPath)) {
      return [currentPath];
    }
    
    // 递归查找匹配的菜单项
    const findMatchingKey = (items: AntdMenuItem[], path: string): string | null => {
      for (const item of items) {
        if (item?.key === path) {
          return item.key as string;
        }
        if (item?.children) {
          const found = findMatchingKey(item.children, path);
          if (found) return found;
        }
      }
      return null;
    };
    
    const matchedKey = findMatchingKey(menuItems, currentPath);
    return matchedKey ? [matchedKey] : [];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    // 对于有效的菜单项，直接导航
    if (key.startsWith('/')) {
      navigate(key);
    } else {
      // 对于其他类型的key，可能需要特殊处理
      console.warn('未识别的菜单项key:', key);
    }
  };

  // 渲染加载中状态
  if (status === MENU_STATUS.LOADING) {
    return (
      <div
        style={{
          height: '100%',
          backgroundColor: '#001529',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A5EAFF',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // 渲染错误状态
  if (status === MENU_STATUS.ERROR || error) {
    return (
      <div
        style={{
          height: '100%',
          backgroundColor: '#001529',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Alert
          message="菜单加载失败"
          description={error || '无法获取菜单数据，请刷新页面重试'}
          type="error"
          showIcon
          action={
            <button
              onClick={refreshMenus}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#ff4d4f',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              重试
            </button>
          }
        />
      </div>
    );
  }

  // 渲染正常菜单
  return (
    <Menu
      mode="inline"
      selectedKeys={getSelectedKeys()}
      items={menuItems as any[]}
      onClick={handleMenuClick}
      theme="dark"
      style={{
        height: '100%',
        borderRight: 0,
        backgroundColor: '#001529',
        color: '#A5EAFF',
        fontSize: '16px',
        flex: 1,
      }}
      className="sidebar-menu"
    />
  );
};

export default SideBar;
