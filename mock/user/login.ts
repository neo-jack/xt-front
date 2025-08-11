// Mock 请求接口类型定义
interface MockRequest {
  body: {
    username: string; //用户名
    password: string; //密码
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
      USER: {
        USER_ID: number; //用户ID
        USER_NAME: string; //用户姓名
        USER_AVATAR: string; //用户头像
        USER_ROLE: string; //用户角色
        HOSPITAL_CNAME: string; //医院名称
        HOSPITAL_ID: number; //医院ID
      };
    } | null; //成功时返回数据，失败时为null
    msg: string | null; //响应消息
  }) => void;
}

// 模拟数据
const mockUsers = [
  {
    USER_ID: 1,
    USER_NAME: '李银',
    USER_AVATAR:
      'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    USER_ROLE: 'root',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'root',
    password: 'root',
  },
  {
    USER_ID: 2,
    USER_NAME: '张医生',
    USER_AVATAR:
      'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    USER_ROLE: 'doctor',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'doctor',
    password: '123456',
  },
];

// 生成模拟的 token
const generateToken = (userId: number): string => {
  const timestamp = Date.now();
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({ userId, timestamp }),
  )}.mock_signature`;
};

//实现模拟
export default {
  'POST /api/user/login': (req: MockRequest, res: MockResponse) => {
    const { username, password } = req.body;

    // 验证请求参数
    if (!username || !password) {
      return res.json({
        code: 1,
        data: null,
        msg: '用户名和密码不能为空',
      });
    }

    // 查找用户
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      return res.json({
        code: 1,
        data: null,
        msg: '用户名或密码错误',
      });
    }

    // 登录成功，返回用户信息和 token
    const accessToken = generateToken(user.USER_ID);
    const refreshToken = generateToken(user.USER_ID);
    const expiresIn = 3600; // 1小时

    res.json({
      code: 0,
      data: {
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        ExpiresIn: expiresIn,
        USER: {
          USER_ID: user.USER_ID,
          USER_NAME: user.USER_NAME,
          USER_AVATAR: user.USER_AVATAR,
          USER_ROLE: user.USER_ROLE,
          HOSPITAL_CNAME: user.HOSPITAL_CNAME,
          HOSPITAL_ID: user.HOSPITAL_ID,
        },
      },
      msg: null,
    });
  },

  // 刷新令牌接口
  'POST /api/user/refresh': (req: any, res: any) => {
    const { refreshToken } = req.body;

    // 验证请求参数
    if (!refreshToken) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌不能为空',
      });
    }

    // 简单验证刷新令牌格式（实际项目中需要验证签名和有效期）
    if (!refreshToken.includes('mock_signature')) {
      return res.json({
        code: 1,
        data: null,
        msg: '刷新令牌无效',
      });
    }

    // 模拟刷新成功，生成新的访问令牌
    const newAccessToken = generateToken(1); // 模拟用户ID为1
    const newExpiresIn = 3600; // 1小时

    res.json({
      code: 0,
      data: {
        AccessToken: newAccessToken,
        ExpiresIn: newExpiresIn,
        // 可选：返回新的刷新令牌（高安全场景）
        // RefreshToken: generateToken(1)
      },
      msg: null,
    });
  },
};
