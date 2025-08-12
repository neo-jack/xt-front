// 用户头像组件
import { TokenManager } from '@/models/usetoken';
import useUser from '@/models/useuser';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar as AntdAvatar, Dropdown, MenuProps, Space } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Avatar: FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useUser();

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
      <Space style={{ cursor: 'pointer' }}>
        <span style={{ color: '#000' }}>{userInfo.USER_NAME || '用户'}</span>
        <AntdAvatar icon={<UserOutlined />} size="small" />
      </Space>
    </Dropdown>
  );
};

export default Avatar;
