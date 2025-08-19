/**
 * 锁屏功能相关的类型定义和常量
 */

// 锁屏配置接口
export interface LockScreenConfig {
  /** 是否启用锁屏功能 */
  isEnabled: boolean;
  /** 锁屏密码 */
  password: string;
  /** 超时时间（分钟） */
  timeoutMinutes: number;
  /** 是否启用自动锁屏 */
  autoLockEnabled: boolean;
}

// 锁屏状态接口
export interface LockScreenState {
  /** 当前是否处于锁屏状态 */
  isLocked: boolean;
  /** 最后活动时间戳 */
  lastActiveTime: number;
  /** 锁屏开始时间戳 */
  lockStartTime: number | null;
}

// 锁屏事件类型
export type LockScreenEvent = 'lock' | 'unlock' | 'timeout' | 'manual';

// 锁屏操作结果
export interface LockScreenResult {
  success: boolean;
  message?: string;
  event: LockScreenEvent;
  timestamp: number;
}

// 默认锁屏配置
export const DEFAULT_LOCK_CONFIG: LockScreenConfig = {
  isEnabled: false,
  password: '',
  timeoutMinutes: 30,
  autoLockEnabled: true,
};

// 默认锁屏状态
export const DEFAULT_LOCK_STATE: LockScreenState = {
  isLocked: false,
  lastActiveTime: Date.now(),
  lockStartTime: null,
};

// 锁屏相关常量
export const LOCK_SCREEN_CONSTANTS = {
  /** LocalStorage 中存储锁屏配置的键名 */
  CONFIG_STORAGE_KEY: 'lockscreen_config',
  /** LocalStorage 中存储锁屏状态的键名 */
  STATE_STORAGE_KEY: 'lockscreen_state',
  /** 检查超时的间隔时间（毫秒） */
  CHECK_TIMEOUT_INTERVAL: 1000,
  /** 最小超时时间（分钟） */
  MIN_TIMEOUT_MINUTES: 1,
  /** 最大超时时间（分钟） */
  MAX_TIMEOUT_MINUTES: 1440, // 24小时
  /** 活动检测的事件类型 */
  ACTIVITY_EVENTS: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'],
} as const;

// 锁屏错误信息
export const LOCK_SCREEN_MESSAGES = {
  PASSWORD_REQUIRED: '请设置锁屏密码',
  PASSWORD_INCORRECT: '密码错误',
  TIMEOUT_INVALID: '超时时间设置无效',
  LOCK_SUCCESS: '锁屏成功',
  UNLOCK_SUCCESS: '解锁成功',
  CONFIG_SAVED: '锁屏设置已保存',
  CONFIG_RESET: '锁屏设置已重置',
} as const;