// 请求 /api/system/info

// Mock 请求接口类型定义
interface MockInfoRequest {
  // GET 请求，通常不需要参数
}

// Mock 响应接口类型定义
interface MockInfoResponse {
      json: (data: {
    code: number; // 响应状态码：0-成功，-1-失败，-2-网络错误
    data: {
      clientip: string; // 客户端地址
          servedomain: string; // 服务器域名
      version: string; // 程序版本
      major: number; // 大版本号
    };
    msg: string | null; // 响应消息
  }) => void;
}

// Mock 实现
export default {
  'GET /api/system/info': (req: any, res: MockInfoResponse) => {
    // 返回成功响应
    res.json({
      code: 0,
      data: {
        clientip: 'localhost',
        servedomain: 'localhost',
        version: '0.2',
        major: 0,
      },
      msg: null,
    });
  },
};
