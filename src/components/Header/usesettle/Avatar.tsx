import useUser from '@/models/useuser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntdAvatar } from 'antd';
import { FC, useState } from 'react';

interface AvatarProps {
  size?: 'small' | 'default' | 'large' | number;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'default', className }) => {
  const { userInfo } = useUser();
  const [avatarError, setAvatarError] = useState(false);

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
