# JWT Token 兼容性说明

## 问题背景

之前前端使用的是 mock token 格式：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{base64_payload}.mock_signature_access
```

后端使用的是标准 JWT 格式，导致 token 验证失败。

## 解决方案

### 1. 前端修改（已完成）

- 新增 `jwt-compatible.ts` 工具类
- 生成与后端完全兼容的标准 JWT token
- 更新 `login.ts` 和 `refresh.ts` 使用新的 token 生成器

### 2. 后端修改（已完成）

- 修改 `JwtUtil.java` 使用固定密钥（开发环境）
- 密钥：`your_secret_key_here_for_development_environment_only_replace_in_production`

## 新的 JWT 格式

### Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

```json
{
  "username": "root",
  "role": "ROOT",
  "userId": 1,
  "sub": "root",
  "iat": 1640000000,
  "exp": 1640003600
}
```

### 完整 Token 示例

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJyb2xlIjoiUk9PVCIsInVzZXJJZCI6MSwic3ViIjoicm9vdCIsImlhdCI6MTY0MDAwMDAwMCwiZXhwIjoxNjQwMDAzNjAwfQ.signature_here
```

## 使用说明

### 前端 Mock 环境

1. 登录时自动生成标准 JWT token
2. Token 包含用户 ID、用户名、角色等信息
3. 自动在请求头中添加 `Authorization: Bearer {token}`

### 后端验证

1. 使用相同的密钥验证 token 签名
2. 解析 payload 获取用户信息
3. 检查 token 过期时间

## 注意事项

1. **密钥管理**：当前使用固定密钥仅适用于开发环境，生产环境应使用环境变量
2. **过期时间**：Access token 1 小时，Refresh token 24 小时
3. **角色映射**：前端角色会转换为大写（如 "root" -> "ROOT"）

## 测试验证

可以通过浏览器开发者工具查看请求头中的 Authorization 字段，确认 token 格式正确。
