import { USER_INFO } from '@/constants';

const useUser = () => {
  // 直接从 localStorage 读取用户信息
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

  return {
    userInfo: getUserInfo(),
  };
};

export default useUser;
