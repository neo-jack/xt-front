// 用户头像上传服务类型定义

// /api/user/avatorupload请求
export interface AvatarUploadRequest {
  id: string;        // 用户ID
  avatar: string;    // 头像数据 (base64格式)
}

// 上传成功后的数据
export interface AvatarUploadData {
  url: string;       // 上传成功后的头像URL
  id: number;        // 头像ID
  message: string;   // 消息
}

// /api/user/avatorupload响应
export interface AvatarUploadResponse {
  code: number;
  data: AvatarUploadData;
  msg: string;
}
