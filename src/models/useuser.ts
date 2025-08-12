import { USER_INFO } from '@/constants';
import { useEffect, useState } from 'react';

// 全局状态存储
let globalUserInfo = USER_INFO;
const subscribers: Set<(userInfo: any) => void> = new Set();

// 更新全局状态并通知所有订阅者
const updateGlobalUserInfo = (newUserInfo: any) => {
  globalUserInfo = newUserInfo;
  subscribers.forEach((callback) => callback(newUserInfo));
};

const useUser = () => {
  const [userInfo, setUserInfo] = useState(globalUserInfo);

  useEffect(() => {
    // 订阅全局状态变化
    const updateLocal = (newUserInfo: any) => {
      setUserInfo(newUserInfo);
    };

    subscribers.add(updateLocal);

    // 清理订阅
    return () => {
      subscribers.delete(updateLocal);
    };
  }, []);

  const setUserInfoGlobal = (newUserInfo: any) => {
    updateGlobalUserInfo(newUserInfo);
  };

  return {
    userInfo,
    setUserInfo: setUserInfoGlobal,
  };
};

export default useUser;
