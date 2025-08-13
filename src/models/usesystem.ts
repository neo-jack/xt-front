import { DEFAULT_SYSTEM_INFO } from '@/constants/system';
import { getSystemInfo } from '@/services/system';
import type { SystemInfo } from '@/services/system/typings';
import { useEffect, useState } from 'react';

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
   * 获取客户端IP
   */
  static getClientIp(): string {
    return this.systemInfo.clientip;
  }

  /**
   * 获取服务器IP
   */
  static getServerIp(): string {
    return this.systemInfo.serveip;
  }

  /**
   * 获取版本信息
   */
  static getVersion(): string {
    return this.systemInfo.version;
  }

  /**
   * 获取主版本号
   */
  static getMajorVersion(): number {
    return this.systemInfo.major;
  }

  /**
   * 检查系统信息是否已初始化
   */
  static isInitialized(): boolean {
    return this.systemInfo.version !== '' && this.systemInfo.clientip !== '';
  }

  /**
   * 重置系统信息
   */
  static reset(): void {
    this.setSystemInfo(DEFAULT_SYSTEM_INFO);
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

  /**
   * 异步获取并设置系统信息
   */
  static async fetchSystemInfo(): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await getSystemInfo();
      if (response.code === 0 && response.data) {
        this.setSystemInfo(response.data);
        return { success: true };
      } else {
        const error = response.msg || '获取系统信息失败';
        console.error('获取系统信息失败:', error);
        return { success: false, error };
      }
    } catch (err) {
      const error = '获取系统信息异常';
      console.error('获取系统信息异常:', err);
      return { success: false, error };
    }
  }
}

/**
 * React Hook版本的系统信息管理
 * 与SystemManager同步状态
 */
const useSystem = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>(
    SystemManager.getSystemInfo(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 监听SystemManager的状态变化
  useEffect(() => {
    const listener = (info: SystemInfo) => {
      setSystemInfo(info);
    };

    SystemManager.addListener(listener);

    // 同步当前状态
    setSystemInfo(SystemManager.getSystemInfo());

    return () => {
      SystemManager.removeListener(listener);
    };
  }, []);

  // 获取系统信息
  const fetchSystemInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await SystemManager.fetchSystemInfo();
      if (!result.success) {
        setError(result.error || '获取系统信息失败');
      }
    } finally {
      setLoading(false);
    }
  };

  // 重置系统信息
  const resetSystemInfo = () => {
    SystemManager.reset();
    setError(null);
  };

  return {
    systemInfo,
    loading,
    error,
    fetchSystemInfo,
    resetSystemInfo,
    // 导出静态方法便于直接访问
    SystemManager,
  };
};

// 导出便捷的静态访问函数
export const getGlobalSystemInfo = () => SystemManager.getSystemInfo();
export const setGlobalSystemInfo = (info: SystemInfo) =>
  SystemManager.setSystemInfo(info);
export const isSystemInfoInitialized = () => SystemManager.isInitialized();

export default useSystem;
