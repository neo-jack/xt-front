// 用户修改密码服务api定义

// /api/user/setpassword请求
export interface SetPasswordRequest {
  OLD_PWD: string;    // 当前密码的哈希值
  NEW_PWD: string;    // 新密码的哈希值
}

// /api/user/setpassword响应
export interface SetPasswordResponse {
  code: number;       // 响应状态码：0-成功，其他-失败
  data: null;         // 修改密码成功时数据为null
  msg: string | null; // 响应消息
}

//用户修改密码服务函数定义

// 密码验证结果 
export interface PasswordValidation {
  isValid: boolean;
  message?: string;
}
