import useUser from '@/models/useuser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntdAvatar } from 'antd';
import { FC, useState, useEffect, useRef } from 'react';

interface AvatarProps {
  size?: 'small' | 'default' | 'large' | number;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'default', className }) => {
  const { userInfo } = useUser();
  const [avatarError, setAvatarError] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0); // 用于强制刷新头像
  const previousAvatarRef = useRef<string>('');

  // 当头像URL改变时，重置错误状态并刷新头像
  useEffect(() => {
    const currentAvatar = userInfo?.USER_AVATAR || '';
    const userId = userInfo?.USER_ID;
    
    // 检查头像是否真的发生了变化
    if (currentAvatar !== previousAvatarRef.current) {
      console.log('Avatar组件检测到头像变化:', {
        userId: userId,
        previous: previousAvatarRef.current,
        current: currentAvatar,
        userName: userInfo?.USER_NAME
      });
      
      // 重置错误状态
      setAvatarError(false);
      
      // 强制刷新头像（通过改变key值）
      setAvatarKey(prev => prev + 1);
      
      // 更新引用
      previousAvatarRef.current = currentAvatar;
    }
  }, [userInfo?.USER_AVATAR, userInfo?.USER_ID, userInfo?.USER_NAME]);

  const handleAvatarError = (): boolean => {
    console.warn('头像加载失败:', userInfo?.USER_AVATAR);
    setAvatarError(true);
    return false;
  };

  const getAvatarSrc = () => {
    if (avatarError || !userInfo?.USER_AVATAR) {
      return undefined;
    }
    
    // 添加时间戳参数防止缓存
    const avatarUrl = userInfo.USER_AVATAR;
    const separator = avatarUrl.includes('?') ? '&' : '?';
    return `${avatarUrl}${separator}_t=${avatarKey}_${Date.now()}`;
  };

  return (
    <AntdAvatar
      key={`avatar-${avatarKey}`} // 强制重新渲染
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
