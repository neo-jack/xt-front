import { TokenManager } from '@/models/usetoken';
import useUser from '@/models/useuser';
import { logout } from '@/services/login/LoginController';
import {
  CameraOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  QrcodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar as AntdAvatar,
  Dropdown,
  MenuProps,
  Space,
  message,
} from 'antd';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HospitalInfo from '../hospital';

const Avatar: FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // 处理头像加载错误
  const handleAvatarError = (): boolean => {
    console.log('Avatar load error, falling back to icon');
    setAvatarError(true);
    return false; // 返回 false 表示阻止默认行为
  };

  // 获取头像源
  const getAvatarSrc = () => {
    if (avatarError || !userInfo?.USER_AVATAR) {
      return undefined; // 返回 undefined 让 AntdAvatar 显示 icon
    }
    return userInfo.USER_AVATAR;
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // 验证用户信息
      if (!userInfo?.USER_ID) {
        message.error('用户信息无效，请重新登录');
        TokenManager.clearTokens();
        navigate('/login');
        return;
      }

      // 调用服务器端登出API
      const response = await logout({
        user_id: userInfo.USER_ID,
      });

      if (response.code === 0) {
        message.success(response.msg || '退出登录成功');
        // 使用TokenManager清除所有令牌
        TokenManager.clearTokens();
        navigate('/login');
      } else {
        // 根据不同的错误代码进行处理
        console.error('Logout API failed:', response);
        message.error(response.msg || '退出登录发生错误');
        // 即使API失败，也要清除本地token
        TokenManager.clearTokens();
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      message.error('网络错误，退出登录失败');
      // 发生网络错误时也要清除本地token
      TokenManager.clearTokens();
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'changeAvatar',
      label: '修改头像',
      icon: <CameraOutlined />,
      onClick: () => {
        console.log('修改头像');
      },
    },
    {
      key: 'qrcode',
      label: '个人二维码',
      icon: <QrcodeOutlined />,
      onClick: () => {
        console.log('个人二维码');
      },
    },
    {
      key: 'lockScreen',
      label: '锁屏设计',
      icon: <LockOutlined />,
      onClick: () => {
        console.log('锁屏设计');
      },
    },
    {
      key: 'about',
      label: '关于系统',
      icon: <InfoCircleOutlined />,
      onClick: () => {
        console.log('关于系统');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: isLoggingOut ? '退出中...' : '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      disabled: isLoggingOut,
    },
  ];

  return (
    <Space size={8} style={{ alignItems: 'center' }}>
      <HospitalInfo />
      <div>
        {/* 空格分隔符 */}
        <div style={{ width: 8 }} />
      </div>

      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Space size={5} style={{ cursor: 'pointer' }}>
          <span style={{ color: '#000' }}>{userInfo?.USER_NAME || '用户'}</span>
          <AntdAvatar
            src={getAvatarSrc()}
            icon={<UserOutlined />}
            size="small"
            onError={handleAvatarError}
            style={{
              backgroundColor: avatarError ? '#f56a00' : undefined,
            }}
          />
        </Space>
      </Dropdown>
    </Space>
  );
};

export default Avatar;
