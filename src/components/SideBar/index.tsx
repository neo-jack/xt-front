// 侧边栏导航组件
import { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  SafetyOutlined,
  TableOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const SideBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 菜单项配置
  const menuItems: MenuItem[] = [
    {
      key: '/xt/home',
      icon: <HomeOutlined />,
      label: '工作看板',
    },
    {
      key: '/xt/access',
      icon: <SafetyOutlined />,
      label: '工作中台',
    },
    {
      key: '/xt/table',
      icon: <TableOutlined />,
      label: 'CRUD 示例',
    },
    {
      key: '/xt/chat',
      icon: <TableOutlined />,
      label: '聊天',
    },
    {
      key: '/xt/table',
      icon: <TableOutlined />,
      label: '需求直报',
    },
    {
      key: '/xt/table',
      icon: <TableOutlined />,
      label: '科室通知',
    },
    {
      key: '/xt/table',
      icon: <TableOutlined />,
      label: '事务流程',
    },
    {
      key: '/xt/table',
      icon: <TableOutlined />,
      label: '杏和智答',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={handleMenuClick}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default SideBar;