import React, { FC, useState, useEffect, useCallback } from 'react';
import { Input, Button, message, Typography, Avatar, Modal } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LogoutOutlined } from '@ant-design/icons';
import useLockScreen from '../../models/uselockscreen';
import useUser from '../../models/useuser';
import useExitAccount from '../Header/usesettle/exitcount';

const { Title, Text } = Typography;

interface LockScreenProps {
  /** 是否显示锁屏界面 */
  visible?: boolean;
  /** 解锁成功回调 */
  onUnlock?: () => void;
}

/**
 * 锁屏界面组件
 * 全屏显示，需要输入密码解锁
 */
const LockScreen: FC<LockScreenProps> = ({ visible = true, onUnlock }) => {
  const { state, unlock, forceUnlock } = useLockScreen();
  const { userInfo } = useUser();
  const { isLoggingOut, handleLogout } = useExitAccount();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 处理解锁
  const handleUnlock = useCallback(async () => {
    if (!password.trim()) {
      message.error('请输入密码');
      return;
    }

    setLoading(true);
    try {
      const result = unlock(password);
      
      if (result.success) {
        message.success(result.message || '解锁成功');
        setPassword('');
        onUnlock?.();
      } else {
        message.error(result.message || '密码错误');
        setPassword('');
      }
    } catch (error) {
      console.error('解锁失败:', error);
      message.error('解锁失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [password, unlock, onUnlock]);

  // 处理退出登录
  const handleLogoutConfirm = useCallback(() => {
    Modal.confirm({
      title: '确认退出登录',
      content: '忘记锁屏密码了吗？退出登录将清除所有本地数据，需要重新登录。',
      icon: <LogoutOutlined />,
      okText: '确定退出',
      cancelText: '取消',
      okButtonProps: { danger: true },
      zIndex: 10000, // 设置更高的层级，确保在锁屏组件之上
      getContainer: () => document.body, // 渲染到body，避免被锁屏组件遮挡
      onOk: async () => {
        try {
          // 先强制解锁屏幕，清除锁屏状态
          const unlockResult = forceUnlock();
          if (unlockResult.success) {
            console.log('锁屏状态已清除');
          } else {
            console.warn('清除锁屏状态失败:', unlockResult.message);
          }
          // 然后执行退出登录
          await handleLogout();
        } catch (error) {
          console.error('退出登录过程中发生错误:', error);
          // 即使出错也要强制解锁，确保不会卡在锁屏界面
          forceUnlock();
          await handleLogout();
        }
      },
    });
  }, [handleLogout, forceUnlock]);

  // 处理键盘事件
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  }, [handleUnlock]);

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // 计算锁屏时长
  const getLockDuration = () => {
    if (!state.lockStartTime) return '';
    
    const duration = Math.floor((Date.now() - state.lockStartTime) / 1000);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    
    if (hours > 0) {
      return `已锁屏 ${hours}小时${minutes}分钟`;
    } else if (minutes > 0) {
      return `已锁屏 ${minutes}分钟${seconds}秒`;
    } else {
      return `已锁屏 ${seconds}秒`;
    }
  };

  if (!visible || !state.isLocked) {
    return null;
  }

  return (
    <div style={styles.container}>
      {/* 背景遮罩 */}
      <div style={styles.backdrop} />
      
      {/* 锁屏内容 */}
      <div style={styles.content}>
        {/* 时间显示 */}
        <div style={styles.timeSection}>
          <Title level={1} style={styles.time}>
            {formatTime(currentTime)}
          </Title>
          <Text style={styles.date}>
            {formatDate(currentTime)}
          </Text>
        </div>

        {/* 用户信息 */}
        <div style={styles.userSection}>
          <Avatar 
            size={80} 
            src={userInfo?.USER_AVATAR} 
            icon={<UserOutlined />}
            style={styles.avatar}
          />
          <Title level={3} style={styles.username}>
            {userInfo?.USER_NAME || '用户'}
          </Title>
          <Text style={styles.lockInfo}>
            {getLockDuration()}
          </Text>
        </div>

        {/* 解锁区域 */}
        <div style={styles.unlockSection}>
          <div style={styles.lockIcon}>
            <LockOutlined />
          </div>
          
          <div style={styles.inputContainer}>
            <Input.Password
              size="large"
              placeholder="输入密码解锁"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={styles.passwordInput}
              autoFocus
            />
            
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleUnlock}
              style={styles.unlockButton}
              icon={<LockOutlined />}
            >
              解锁
            </Button>
            
            <Button
              type="text"
              size="large"
              loading={isLoggingOut}
              onClick={handleLogoutConfirm}
              style={styles.logoutButton}
              icon={<LogoutOutlined />}
            >
              忘记密码？退出登录
            </Button>
          </div>
        </div>

        {/* 提示信息 */}
        <div style={styles.hintSection}>
          <Text style={styles.hint}>
            请输入锁屏密码以解锁系统
          </Text>
        </div>
      </div>
    </div>
  );
};

// 样式定义
const styles = {
  container: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  
  backdrop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#A0522D', // 马鞍棕色 - 温暖且专业的暖色调
    opacity: 1, // 完全不透明
  },
  
  content: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    color: '#fff',
    maxWidth: '400px',
    width: '100%',
    padding: '40px 20px',
  },
  
  timeSection: {
    marginBottom: '40px',
  },
  
  time: {
    color: '#fff !important',
    fontSize: '64px !important',
    fontWeight: '200 !important',
    margin: '0 !important',
    lineHeight: '1 !important',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  
  date: {
    color: 'rgba(255,255,255,0.8) !important',
    fontSize: '18px !important',
    fontWeight: '300 !important',
    marginTop: '8px',
  },
  
  userSection: {
    marginBottom: '40px',
  },
  
  avatar: {
    marginBottom: '16px',
    border: '3px solid rgba(255,255,255,0.3)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  
  username: {
    color: '#fff !important',
    fontSize: '24px !important',
    fontWeight: '400 !important',
    margin: '0 0 8px 0 !important',
  },
  
  lockInfo: {
    color: 'rgba(255,255,255,0.7) !important',
    fontSize: '14px !important',
  },
  
  unlockSection: {
    marginBottom: '30px',
    width: '100%',
  },
  
  lockIcon: {
    fontSize: '32px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '20px',
  },
  
  inputContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    width: '100%',
  },
  
  passwordInput: {
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
  },
  
  unlockButton: {
    borderRadius: '8px',
    height: '44px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
  },
  
  hintSection: {
    textAlign: 'center' as const,
  },
  
  hint: {
    color: 'rgba(255,255,255,0.6) !important',
    fontSize: '14px !important',
  },
  
  logoutButton: {
    borderRadius: '8px',
    height: '40px',
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    fontWeight: 400,
    marginTop: '8px',
  },
};

export default LockScreen;
