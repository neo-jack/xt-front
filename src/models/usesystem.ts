import { DEFAULT_SYSTEM_INFO } from '@/constants/system';
import { type SystemInfo } from '@/services';
import { useCallback, useEffect, useState } from 'react';

/**
 * 全局系统信息管理器
 * 提供静态方法访问系统信息，类似TokenManager模式
 */
export class SystemManager {
  private static systemInfo: SystemInfo = DEFAULT_SYSTEM_INFO;
  private static listeners: Set<(info: SystemInfo) => void> = new Set();

  /**
   * 设置系统信息
   */
  static setSystemInfo(info: SystemInfo): void {
    this.systemInfo = { ...info };
    // 通知所有监听器
    this.listeners.forEach((listener) => listener(this.systemInfo));
  }

  /**
   * 获取系统信息
   */
  static getSystemInfo(): SystemInfo {
    return { ...this.systemInfo };
  }

  /**
   * 添加监听器（用于React Hook同步状态）
   */
  static addListener(listener: (info: SystemInfo) => void): void {
    this.listeners.add(listener);
  }

  /**
   * 移除监听器
   */
  static removeListener(listener: (info: SystemInfo) => void): void {
    this.listeners.delete(listener);
  }
}

/**
 * React Hook版本的系统信息管理
 * 与SystemManager同步状态
 */
const useSystem = () => {
  const [systemInfo, setSystemInfoState] = useState<SystemInfo>(
    SystemManager.getSystemInfo(),
  );

  // 监听SystemManager的状态变化
  useEffect(() => {
    const listener = (info: SystemInfo) => {
      setSystemInfoState(info);
    };

    SystemManager.addListener(listener);

    // 同步当前状态
    setSystemInfoState(SystemManager.getSystemInfo());

    return () => {
      SystemManager.removeListener(listener);
    };
  }, []);

  // 设置系统信息
  const setSystemInfo = useCallback((newSystemInfo: SystemInfo) => {
    SystemManager.setSystemInfo(newSystemInfo);
  }, []);

  return {
    systemInfo,
    setSystemInfo,
  };
};

// 导出便捷的静态访问函数
export const getGlobalSystemInfo = () => SystemManager.getSystemInfo();
export const setGlobalSystemInfo = (info: SystemInfo) =>
  SystemManager.setSystemInfo(info);

export default useSystem;
