// 侧边栏导航组件
import {
  ApartmentOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  NotificationOutlined,
  RobotOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

type MenuItem = Required<MenuProps>['items'][number];

const SideBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 菜单项配置
  const menuItems: MenuItem[] = [
    {
      key: '/xt/workboard',
      icon: <DashboardOutlined />,
      label: '工作看板',
    },
    {
      key: '/xt/workcenter',
      icon: <AppstoreOutlined />,
      label: '工作中台',
    },
    {
      key: '/xt/quickwork',
      icon: <ThunderboltOutlined />,
      label: '快速工作入口',
      children: [
        {
          key: '/xt/quickwork/sub1',
          label: '子功能1',
        },
        {
          key: '/xt/quickwork/sub2',
          label: '子功能2',
        },
      ],
    },
    {
      key: '/xt/im',
      icon: <MessageOutlined />,
      label: '聊天',
    },
    {
      key: 'report',
      icon: <FileTextOutlined />,
      label: '需求直报',
    },
    {
      key: '/xt/department-notice',
      icon: <NotificationOutlined />,
      label: '科室通知',
    },
    {
      key: 'workflow',
      icon: <ApartmentOutlined />,
      label: '事务流程',
    },
    {
      key: 'ai',
      icon: <RobotOutlined />,
      label: '杏和智答',
    },
  ];

  // 特殊菜单项到路径的映射
  const menuKeyToPath: Record<string, string> = {
    'report': '/xt/not-xt-page',
    'workflow': '/xt/not-xt-page',
    'ai': '/xt/not-xt-page',
  };

  // 路径到菜单key的映射，用于确定当前选中的菜单项
  const pathToMenuKey: Record<string, string> = {
    '/xt/not-xt-page': getActiveMenuKey(),
  };

  // 根据当前路径和来源确定应该高亮的菜单项
  function getActiveMenuKey(): string {
    // 这里可以通过localStorage或其他方式来记住用户最后点击的菜单
    const lastClickedMenu = localStorage.getItem('lastClickedMenu');
    if (lastClickedMenu && ['report', 'workflow', 'ai'].includes(lastClickedMenu)) {
      return lastClickedMenu;
    }
    return 'report'; // 默认选中需求直报
  }

  // 获取当前应该选中的菜单key
  const getSelectedKeys = (): string[] => {
    const currentPath = location.pathname;
    if (currentPath === '/xt/not-xt-page') {
      return [getActiveMenuKey()];
    }
    return [currentPath];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    // 如果是特殊菜单项，记录到localStorage并导航到对应路径
    if (menuKeyToPath[key]) {
      localStorage.setItem('lastClickedMenu', key);
      navigate(menuKeyToPath[key]);
    } else {
      // 普通菜单项直接导航
      navigate(key);
    }
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={getSelectedKeys()}
      items={menuItems}
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
