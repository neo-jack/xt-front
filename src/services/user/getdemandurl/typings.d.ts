// 获取二维码URL服务类型定义

// /api/user/getdemandurl请求
export interface GetDemandUrlRequest {
  // 请求不需要额外参数，通过Authorization header传递token
}

// /api/user/getdemandurl响应
export interface GetDemandUrlResponse {
  code: number;
  data: QRCodeUrl[];
  msg: string;
}

// 二维码URL数据
export interface QRCodeUrl {
  url: string;
}
