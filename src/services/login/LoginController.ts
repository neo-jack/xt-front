/* eslint-disable */
// 该文件为登录模块控制器

// 本地存储键名常量
const STORAGE_KEYS = {
  TOKEN: 'AUTH_TOKEN',
  USER_INFO: 'USER_INFO',
  TOKEN_EXPIRES: 'TOKEN_EXPIRES',
} as const;

// 模拟用户数据
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    roles: ['admin', 'user'],
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    roles: ['user'],
  },
] as const;

// 生成随机token
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 模拟异步延迟
function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 用户登录 */
export async function login(
  body?: LOGIN.LoginFormData,
  options?: { [key: string]: any },
): Promise<LOGIN.Result_LoginResponseData_> {
  await delay();

  if (!body?.username || !body?.password) {
    return {
      success: false,
      errorMessage: '用户名和密码不能为空',
      data: undefined,
    };
  }

  // 查找用户
  const user = MOCK_USERS.find(
    (u) => u.username === body.username && u.password === body.password,
  );

  if (!user) {
    return {
      success: false,
      errorMessage: '用户名或密码错误',
      data: undefined,
    };
  }

  // 生成token和过期时间
  const token = generateToken();
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24小时后过期

  const userInfo: LOGIN.UserInfo = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    roles: user.roles,
  };

  const responseData: LOGIN.LoginResponseData = {
    user: userInfo,
    token,
    expires,
  };

  // 存储到localStorage
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expires.toString());

  return {
    success: true,
    errorMessage: undefined,
    data: responseData,
  };
}

/** 获取当前用户信息 */
export async function getCurrentUser(options?: {
  [key: string]: any;
}): Promise<LOGIN.Result_UserInfo_> {
  await delay(200);

  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  const expiresStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);

  if (!token || !userInfoStr || !expiresStr) {
    return {
      success: false,
      errorMessage: '用户未登录',
      data: undefined,
    };
  }

  // 检查token是否过期
  const expires = parseInt(expiresStr);
  if (Date.now() > expires) {
    // 清理过期数据
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES);

    return {
      success: false,
      errorMessage: 'Token已过期，请重新登录',
      data: undefined,
    };
  }

  try {
    const userInfo: LOGIN.UserInfo = JSON.parse(userInfoStr);
    return {
      success: true,
      errorMessage: undefined,
      data: userInfo,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: '用户信息解析失败',
      data: undefined,
    };
  }
}

/** 用户登出 */
export async function logout(options?: {
  [key: string]: any;
}): Promise<LOGIN.Result_string_> {
  await delay(200);

  // 清理localStorage中的认证信息
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES);

  return {
    success: true,
    errorMessage: undefined,
    data: '登出成功',
  };
}

/** 验证token有效性 */
export async function validateToken(options?: {
  [key: string]: any;
}): Promise<LOGIN.Result_ValidateToken_> {
  await delay(200);

  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  const expiresStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);

  if (!token || !userInfoStr || !expiresStr) {
    return {
      success: false,
      errorMessage: 'Token不存在',
      data: undefined,
    };
  }

  // 检查token是否过期
  const expires = parseInt(expiresStr);
  if (Date.now() > expires) {
    // 清理过期数据
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES);

    return {
      success: false,
      errorMessage: 'Token已过期',
      data: undefined,
    };
  }

  try {
    const userInfo: LOGIN.UserInfo = JSON.parse(userInfoStr);
    return {
      success: true,
      errorMessage: undefined,
      data: userInfo,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'Token验证失败',
      data: undefined,
    };
  }
}

/** 检查是否已登录 */
export function isLoggedIn(): boolean {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const expiresStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);

  if (!token || !expiresStr) {
    return false;
  }

  const expires = parseInt(expiresStr);
  return Date.now() <= expires;
}

/** 获取当前token */
export function getToken(): string | null {
  if (!isLoggedIn()) {
    return null;
  }
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}
