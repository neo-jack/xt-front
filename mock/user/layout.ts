// Mock 请求接口类型定义
interface MockLogoutRequest {
  body: {
    user_id: number; //用户ID
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
    const { user_id } = req.body;

    // 验证请求参数
    if (!user_id || typeof user_id !== 'number') {
      return res.json({
        code: -1,
        data: null,
        msg: '用户ID参数无效',
      });
    }

    // 模拟登出成功
    // 在实际应用中，这里可能会清除服务器端的session、token等
    console.log(`用户 ${user_id} 已成功登出`);

    res.json({
      code: 0,
      data: null,
      msg: '登出成功',
    });
  },
};
