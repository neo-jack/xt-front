import useUser from '@/models/useuser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntdAvatar } from 'antd';
import { FC, useState, useEffect } from 'react';

interface AvatarProps {
  size?: 'small' | 'default' | 'large' | number;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'default', className }) => {
  const { userInfo } = useUser();
  const [avatarError, setAvatarError] = useState(false);

  // 当头像URL改变时，重置错误状态
  useEffect(() => {
    setAvatarError(false);
  }, [userInfo?.USER_AVATAR]);

  const handleAvatarError = (): boolean => {
    setAvatarError(true);
    return false;
  };

  const getAvatarSrc = () => {
    if (avatarError || !userInfo?.USER_AVATAR) {
      return undefined;
    }
    return userInfo.USER_AVATAR;
  };

  return (
    <AntdAvatar
      src={getAvatarSrc()}
      icon={<UserOutlined />}
      size={size}
      onError={handleAvatarError}
      className={className}
      style={{ backgroundColor: avatarError ? '#f56a00' : undefined }}
    />
  );
};

export default Avatar;
