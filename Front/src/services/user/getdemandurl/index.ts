// 该文件为获取二维码URL模块导出文件

import * as GetDemandUrlController from './GetDemandUrlController';

export const { getDemandUrl } = GetDemandUrlController;

// 导出类型定义
export type {
  GetDemandUrlRequest,
  GetDemandUrlResponse,
  QRCodeUrl,
} from './typings';
