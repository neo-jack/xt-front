# Mock API 使用说明

## 概述

这个目录包含了项目的所有 Mock API 文件，用于在开发环境中模拟后端 API 响应。Mock API 可以让前端开发不依赖后端服务器进行开发和测试。


## 启用/禁用 Mock

### 启用 Mock
在开发环境中，确保没有配置 proxy 或者临时注释掉 `.umirc.ts` 中的 proxy 配置：

```typescript
// proxy: {
//   '/api': {
//     target: 'http://localhost:8080',
//     changeOrigin: true,
//     pathRewrite: { '^/api': '/api' },
//   },
// },
```

### 禁用 Mock
取消注释 proxy 配置即可禁用 Mock，请求将转发到真实的后端服务。

## API 接口说明

### 用户认证 API (userAPI.ts)


## 返回格式说明

所有API统一使用以下返回格式（与后端保持一致）：

```typescript
{
  code: number,    // 0: 成功, -1: 失败, -2: 错误
  data: any,       // 返回数据
  msg: string      // 返回消息
}
```

- **成功响应**：`{ code: 0, data: {...}, msg: "操作成功" }`
- **失败响应**：`{ code: -1, data: null, msg: "错误信息" }`
- **系统错误**：`{ code: -2, data: null, msg: "系统错误" }`

## Mock 数据特性

1. **网络延迟模拟**：所有 API 都包含 100-300ms 的延迟模拟，更真实地模拟网络请求
2. **数据验证**：包含完整的参数验证和错误处理
3. **认证模拟**：用户认证 API 包含 JWT token 模拟
4. **分页支持**：列表类 API 支持分页查询
5. **搜索功能**：支持关键词搜索和分类过滤
6. **错误处理**：包含各种错误场景的模拟
7. **统一格式**：所有返回格式与后端 ResultVO 保持一致

## 注意事项

1. Mock 数据在页面刷新后会重置
2. Mock API 的响应格式与后端 API 保持一致
3. 开发时可以随时切换 Mock 和真实 API
4. Mock 数据包含了常见的业务场景和边界情况

## 如何扩展

1. 在对应的 mock 文件中添加新的 API 端点
2. 遵循现有的错误处理和响应格式约定
3. 添加适当的数据验证逻辑
4. 更新此 README 文档
