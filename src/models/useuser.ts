import { USER_INFO } from '@/constants';
import { useState, useCallback } from 'react';

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

  // 更新用户信息
  const setUserInfo = useCallback((newUserInfo: any) => {
    setUserInfoState(newUserInfo);
    // 同时保存到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  }, []);

  return {
    userInfo,
    setUserInfo,
  };
};

export default useUser;
