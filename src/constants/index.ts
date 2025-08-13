export const DEFAULT_NAME = 'Umi Max';


/** 通用状态码 */
export type Status = 0 | 1;

/** api状态码 */
export const SYSTEM_CODE = {
    SUCCESS: 0, // 成功
    FAIL: -1, // 失败
    NETWORK_ERROR: -2, // 网络错误
  } as const;

//


// 导出相关常量
export { WORK_CENTER_MENUS } from './workboard';

export { USER_INFO } from './user';

export { TOKEN_INFO } from './token';

export {DEFAULT_SYSTEM_INFO} from './system';
