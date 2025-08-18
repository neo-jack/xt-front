# Mock 工具函数说明

## 📁 文件结构

```
mock/utils/
├── index.ts          # 统一导出文件
├── tokenid.ts        # Token解析工具函数
└── README.md         # 本文档
```

## 🔧 Token 工具函数 (tokenid.ts)

### parseTokenUserId(token: string): number | null

从 JWT token 中解析用户 ID。

**参数:**

- `token`: Bearer token 字符串 (如: "Bearer eyJhbGciOiJIUzI1NiIs...")

**返回:**

- 成功: 用户 ID (number)
- 失败: null

**示例:**

```typescript
import { parseTokenUserId } from '../utils/tokenid';

const userId = parseTokenUserId(req.headers.authorization);
if (userId) {
  console.log('用户ID:', userId);
} else {
  console.log('Token解析失败');
}
```

### isValidTokenFormat(token: string): boolean

验证 token 格式是否正确。

**参数:**

- `token`: Bearer token 字符串

**返回:**

- `true`: 格式正确
- `false`: 格式错误

**示例:**

```typescript
import { isValidTokenFormat } from '../utils/tokenid';

if (isValidTokenFormat(token)) {
  // 继续处理
} else {
  // 返回格式错误
}
```

### parseTokenPayload(token: string): any

解析 token 的完整 payload。

**参数:**

- `token`: Bearer token 字符串

**返回:**

- 成功: payload 对象
- 失败: null

**示例:**

```typescript
import { parseTokenPayload } from '../utils/tokenid';

const payload = parseTokenPayload(token);
if (payload) {
  console.log('用户ID:', payload.userId);
  console.log('时间戳:', payload.timestamp);
  console.log('类型:', payload.type);
}
```

### isTokenExpired(token: string): boolean

检查 token 是否过期。

**参数:**

- `token`: Bearer token 字符串

**返回:**

- `true`: 已过期
- `false`: 未过期

**示例:**

```typescript
import { isTokenExpired } from '../utils/tokenid';

if (isTokenExpired(token)) {
  return res.json({
    code: 401,
    msg: 'Token已过期',
  });
}
```

## 🚀 使用指南

### 1. 统一导入

```typescript
// 推荐：从统一入口导入
import { parseTokenUserId, isValidTokenFormat } from '../utils';

// 或者：从具体文件导入
import { parseTokenUserId } from '../utils/tokenid';
```

### 2. 在 Mock API 中使用

```typescript
import { parseTokenUserId } from '../utils/tokenid';

export default {
  'POST /api/user/example': (req: MockRequest, res: MockResponse) => {
    // 解析用户ID
    const userId = parseTokenUserId(req.headers.authorization);

    if (!userId) {
      return res.json({
        code: 401,
        data: null,
        msg: '无效的token',
      });
    }

    // 继续业务逻辑...
  },
};
```

### 3. 错误处理

所有函数都包含详细的错误处理和日志输出，便于调试：

```
[parseTokenUserId] 开始解析token
[parseTokenUserId] 提取token部分: eyJhbGciOiJIUzI1NiIs...
[parseTokenUserId] token分段数量: 3
[parseTokenUserId] 开始解析payload部分
[parseTokenUserId] payload解析成功: {
  "userId": 1,
  "timestamp": 1640995200000,
  "type": "access"
}
[parseTokenUserId] 提取到的用户ID: 1
```

## 📊 迁移示例

### 迁移前（各自实现）

```typescript
// setpassword.ts
const parseTokenUserId = (token: string): number | null => {
  // 重复的解析逻辑...
};

// info.ts
const extractUserIdFromToken = (token: string): number | null => {
  // 重复的解析逻辑...
};

// refresh.ts
const parseToken = (
  token: string,
): { userId: number; timestamp: number } | null => {
  // 重复的解析逻辑...
};
```

### 迁移后（统一工具）

```typescript
// 所有文件统一使用
import { parseTokenUserId, parseTokenPayload } from '../utils/tokenid';

// setpassword.ts
const userId = parseTokenUserId(authHeader);

// info.ts
const userId = parseTokenUserId(authorization);

// refresh.ts
const payload = parseTokenPayload(`Bearer ${refreshToken}`);
const tokenData = payload
  ? {
      userId: payload.userId,
      timestamp: payload.timestamp,
    }
  : null;
```

## 🎯 优势

- ✅ **代码复用**: 避免重复实现
- ✅ **统一逻辑**: 保证解析行为一致
- ✅ **易于维护**: 集中管理 token 解析逻辑
- ✅ **调试友好**: 统一的日志输出格式
- ✅ **类型安全**: 完整的 TypeScript 支持
- ✅ **错误处理**: 完善的异常处理机制
