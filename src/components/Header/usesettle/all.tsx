import useUser from '@/models/useuser';
import {
  CameraOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  QrcodeOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import { FC, useState } from 'react';
import HospitalInfo from './hospital';
import Avatar from './Avatar';
import LinkInfo from './link';
import ChangeAvatarModal from './setavator';
import ChangePasswordModal from './setpassword';
import QRCodeModal from './qrcode';
import LockScreenModal from './lockscreen';
import SystemInfoModal from './system';
import useExitAccount from './exitcount';

const AllUserActions: FC = () => {
  //登出用户
  const { userInfo } = useUser();
  const { isLoggingOut, handleLogout } = useExitAccount();
  
  //设置弹窗
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showSystemInfo, setShowSystemInfo] = useState(false);

  //下拉框内容
  const items: MenuProps['items'] = [
    {
      key: 'changeAvatar',
      label: '修改头像',
      icon: <CameraOutlined />,
      onClick: () => setShowChangeAvatar(true),
    },
    {
      key: 'changePassword',
      label: '修改密码',
      icon: <KeyOutlined />,
      onClick: () => setShowChangePassword(true),
    },
    {
      key: 'qrcode',
      label: '个人二维码',
      icon: <QrcodeOutlined />,
      onClick: () => setShowQRCode(true),
    },
    {
      key: 'lockScreen',
      label: '锁屏设计',
      icon: <LockOutlined />,
      onClick: () => setShowLockScreen(true),
    },
    {
      key: 'about',
      label: '关于系统',
      icon: <InfoCircleOutlined />,
      onClick: () => setShowSystemInfo(true),
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

  //返回
  return (
    <>
      <Space size={8} style={{ alignItems: 'center' }}>
        {/* 医院信息 */}
        <HospitalInfo />
        <div>
          <div style={{ width: 8 }} />
        </div>
        {/* 链路信息 */}
        <LinkInfo />
        <div>
          <div style={{ width: 8 }} />
        </div>
        {/* 下拉框 */}
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
           {/* 用户信息 */}
          <Space size={5} style={{ cursor: 'pointer' }}>
            <span style={{ color: '#000' }}>{userInfo?.USER_NAME || '用户'}</span>
            <Avatar size="small" />
          </Space>
        </Dropdown>
      </Space>
      {/*  */}
      <ChangeAvatarModal
        open={showChangeAvatar}
        onCancel={() => setShowChangeAvatar(false)}
        avatarSrc={userInfo?.USER_AVATAR}
        userId={userInfo?.USER_ID ? String(userInfo.USER_ID) : ''}
        onOk={(newAvatar) => {
          // 这里可以添加头像更新的逻辑
          setShowChangeAvatar(false);
        }}
      />
      <ChangePasswordModal
        open={showChangePassword}
        onCancel={() => setShowChangePassword(false)}
      />
      <QRCodeModal
        open={showQRCode}
        onCancel={() => setShowQRCode(false)}
        userInfo={userInfo}
      />
      <LockScreenModal
        open={showLockScreen}
        onCancel={() => setShowLockScreen(false)}
      />
      <SystemInfoModal
        open={showSystemInfo}
        onCancel={() => setShowSystemInfo(false)}
        userInfo={userInfo}
      />
    </>
  );
};

export default AllUserActions;
