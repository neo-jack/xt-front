import { parseTokenUserId } from '../utils/tokenid';

// Mock 请求接口类型定义
interface MockLogoutRequest {
  headers: {
    authorization?: string; // Bearer token
  };
  body: {
    // 不再需要user_id字段，从token中解析
  };
}

// Mock 响应接口类型定义
interface MockResponse {
  json: (data: {
    code: number; //响应状态码：0-成功，其他-失败
    data: null; //登出成功时数据为null
    msg: string | null; //响应消息
  }) => void;
}

// 实现模拟登出
export default {
  'POST /api/user/logout': (req: MockLogoutRequest, res: MockResponse) => {
    const authHeader = req.headers.authorization;
    
    console.log(`Mock: 收到用户登出请求`);

    // 从token解析用户ID
    const userId = parseTokenUserId(authHeader || '');
    
    if (!userId) {
      return res.json({
        code: 401,
        data: null,
        msg: '无效的token或用户ID',
      });
    }

    // 模拟登出成功
    // 在实际应用中，这里可能会清除服务器端的session、token等
    console.log(`用户 ${userId} 已成功登出`);

    res.json({
      code: 0,
      data: null,
      msg: '登出成功',
    });
  },
};
