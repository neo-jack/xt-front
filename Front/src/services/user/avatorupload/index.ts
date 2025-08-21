// 该文件为用户头像上传模块导出文件

import * as AvatoruploadController from './AvatoruploadController';

export const { uploadAvatar } = AvatoruploadController;

// 导出类型定义
export type {
  AvatarUploadRequest,
  AvatarUploadResponse,
  AvatarUploadData,
} from './typings';
