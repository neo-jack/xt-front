# XT Project

## 项目概述

XT Project 是一个企业级应用系统，集成了多个模块和前后端框架，提供完整的业务解决方案。该项目采用微服务架构，包含多个独立的前后端应用，为用户提供流畅的操作体验。

## 技术栈

### 前端技术

- **React 18.1.0**: 核心 UI 框架
- **Umi**: 企业级 React 应用框架，提供路由、构建工具和开发服务器
- **TypeScript 4.7.2**: 主要开发语言，为 JavaScript 添加静态类型检查
- **Ant Design**: 提供企业级组件的 React UI 库
- **Less**: CSS 预处理器，增强样式能力
- **Redux**: 可预测的 JavaScript 应用状态容器
- **Axios**: 基于 Promise 的 HTTP 客户端，用于 API 请求

### 后端技术

- **Java**: 后端服务开发语言
- **Spring Boot**: 微服务框架，简化应用开发

## 项目结构

- **Front**: 主要 React/Umi 前端应用
- **Frontend**: Java 后端服务
- **H40Front**: 第二 React/Umi 前端应用
- **H40Frontend**: 第二 Java 后端服务
- **Archetype**: 项目原型和模板
- **Datebash**: 数据资源和模块管理

## 功能特点

- **用户认证**: JWT 基于令牌的安全用户认证
- **模块化设计**: 可重用组件库和业务逻辑服务
- **状态管理**: 集中式应用状态管理
- **API 层架构**: 集中式 HTTP 客户端，带请求/响应拦截器
- **布局系统**: 一致的页面布局和导航

## 开发环境设置

### 前端开发

1. 进入前端目录: `cd Front`
2. 安装依赖: `npm install`
3. 启动开发服务器: `npm run start`

### 后端开发

1. 进入后端目录: `cd Frontend`
2. 使用 Maven 构建项目: `./mvnw clean install`
3. 运行应用: `./mvnw spring-boot:run`

## 快速启动

使用提供的启动脚本一键启动应用:

```
start.bat
```

## 访问方式

应用启动后，可通过以下地址访问:

- 前端应用: http://localhost:8000
- 后端 API: http://localhost:8080
