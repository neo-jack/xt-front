# UMI System Backend

## 项目简介
UMI系统后端，提供用户管理和认证服务，支持JWT Token认证。

## 技术栈
- Spring Boot 2.7.7
- MySQL 8.0+
- MyBatis Plus 3.3.2
- JWT (jsonwebtoken 0.11.5)
- MD5 密码加密

## 数据库配置
1. 执行SQL脚本 `../SQL/umi_system.sql` 创建数据库和表
2. 修改 `src/main/resources/application.yml` 中的数据库连接信息

## 运行项目
```bash
# 使用Maven运行
./mvnw spring-boot:run

# 或者使用IDE直接运行 UmiSystemApplication.java
```

## API接口

### 用户认证
- **POST** `/api/user/login` - 用户登录
  ```json
  {
    "username": "root",
    "password": "root"
  }
  ```

- **POST** `/api/user/logout` - 用户登出
  - Header: `Authorization: Bearer <token>`

- **GET** `/api/user/info` - 获取用户信息  
  - Header: `Authorization: Bearer <token>`

## 测试用户
数据库中预置的测试用户：
- 用户名：`root`，密码：`root`，角色：超级管理员
- 用户名：`admin`，密码：`admin`，角色：超级用户
- 用户名：`user`，密码：`test`，角色：普通用户

## 前端对接
后端接口已按照前端 `Front/src/services/login` 中的接口规范实现，可直接对接。
