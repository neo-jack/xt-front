import { USER_INFO } from '@/constants';
import { useState, useCallback, useEffect } from 'react';
import { userInfoWatcher } from './userInfoWatcher';

const useUser = () => {
  // 从 localStorage 读取用户信息
  const getUserInfo = () => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      try {
        return JSON.parse(savedUserInfo);
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    }
    return USER_INFO;
  };

  const [userInfo, setUserInfoState] = useState(getUserInfo());

  // 监听用户信息变化
  useEffect(() => {
    const handleUserInfoChange = (newUserInfo: typeof USER_INFO) => {
      setUserInfoState(newUserInfo);
    };

    // 添加监听器
    userInfoWatcher.addListener(handleUserInfoChange);

    // 同步当前状态
    const currentUserInfo = userInfoWatcher.getCurrentUserInfo();
    if (JSON.stringify(currentUserInfo) !== JSON.stringify(userInfo)) {
      setUserInfoState(currentUserInfo);
    }

    // 清理监听器
    return () => {
      userInfoWatcher.removeListener(handleUserInfoChange);
    };
  }, []); // 只在组件挂载时执行一次

  // 更新用户信息
  const setUserInfo = useCallback((newUserInfo: any) => {
    // 使用监控器的强制更新方法，确保所有组件都能收到更新通知
    userInfoWatcher.forceUpdate(newUserInfo);
  }, []);

  return {
    userInfo,
    setUserInfo,
  };
};

export default useUser;
