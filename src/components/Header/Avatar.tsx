// 用户头像组件
import { TokenManager } from '@/utils/auth';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar as AntdAvatar, Dropdown, MenuProps } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Avatar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 使用TokenManager清除所有令牌
    TokenManager.clearTokens();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人设置',
      icon: <SettingOutlined />,
      onClick: () => {
        // 跳转到个人设置页面
        console.log('跳转到个人设置');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <AntdAvatar
        style={{ cursor: 'pointer' }}
        icon={<UserOutlined />}
        size="small"
      />
    </Dropdown>
  );
};

export default Avatar;
