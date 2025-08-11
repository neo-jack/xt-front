//Mock 请求接口类型定义
interface MockRequest {
  body: {
    refreshToken: string; //刷新令牌
  };
}

//Mock 响应接口类型定义
interface MockResponse {
  json: (data: {
    code: number; //响应状态码：0-成功，其他-失败
    data: {
      AccessToken: string; //访问令牌
      RefreshToken: string; //刷新令牌
      ExpiresIn: number; //过期时间(秒)
    } | null; //成功时返回数据，失败时为null
    msg: string | null; //响应消息
  }) => void;
}

// 生成模拟的 token
const generateToken = (
  userId: number,
  tokenType: 'access' | 'refresh',
): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8); // 6位随机字符
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({
      userId,
      timestamp,
      type: tokenType,
      random: randomSuffix,
    }),
  )}.mock_signature_${tokenType}`;
};

// 解析模拟的 token，提取用户ID
const parseToken = (
  token: string,
): { userId: number; timestamp: number } | null => {
  try {
    // 分割 JWT token
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // 解码 payload
    const payload = JSON.parse(atob(parts[1]));
    return {
      userId: payload.userId,
      timestamp: payload.timestamp,
    };
  } catch (error) {
    return null;
  }
};

// 检查令牌是否过期（模拟：7天过期）
const isTokenExpired = (timestamp: number): boolean => {
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7天
  return Date.now() - timestamp > sevenDaysInMs;
};

//实现刷新令牌模拟
export default {
  'POST /api/user/refresh': (req: MockRequest, res: MockResponse) => {
    const { refreshToken } = req.body;

    // 验证请求参数
    if (!refreshToken) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌不能为空',
      });
    }

    // 解析刷新令牌
    const tokenData = parseToken(refreshToken);
    if (!tokenData) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌格式无效',
      });
    }

    // 检查刷新令牌是否过期
    if (isTokenExpired(tokenData.timestamp)) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌已过期，请重新登录',
      });
    }

    // 验证用户ID是否有效（这里简单验证是否为正数）
    if (!tokenData.userId || tokenData.userId <= 0) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌中的用户信息无效',
      });
    }

    // 刷新成功，生成新的令牌
    const newAccessToken = generateToken(tokenData.userId, 'access');
    const newRefreshToken = generateToken(tokenData.userId, 'refresh');
    const expiresIn = 3600; // 1小时

    return res.json({
      code: 0,
      data: {
        AccessToken: newAccessToken,
        RefreshToken: newRefreshToken,
        ExpiresIn: expiresIn,
      },
      msg: null,
    });
  },
};
