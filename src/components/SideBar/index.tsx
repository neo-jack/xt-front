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
      key: '/xt/chat',
      icon: <MessageOutlined />,
      label: '聊天',
    },
    {
      key: '/xt/report',
      icon: <FileTextOutlined />,
      label: '需求直报',
    },
    {
      key: '/xt/notice',
      icon: <NotificationOutlined />,
      label: '科室通知',
    },
    {
      key: '/xt/workflow',
      icon: <ApartmentOutlined />,
      label: '事务流程',
    },
    {
      key: '/xt/ai',
      icon: <RobotOutlined />,
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
