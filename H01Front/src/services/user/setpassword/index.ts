// 该文件为用户修改密码模块导出文件

import * as SetPasswordController from './SetPasswordController';

export const { 
  setPassword, 
  validatePasswordStrength, 
  hashPassword, 
  validatePasswordMatch,
  isMD5Format
} = SetPasswordController;

// 导出类型定义
export type {
  SetPasswordRequest,
  SetPasswordResponse,
  PasswordValidation,
 
} from './typings';
