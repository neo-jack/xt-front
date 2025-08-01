import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '管理系统',
  },
  routes: [
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false, // 登录页完全不使用任何布局
    },
    {
      path: '/',
      component: '@/layouts/AuthLayout', // 使用权限布局作为根路由
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          name: '首页',
          path: '/home',
          component: './Home',
        },
        {
          name: '权限演示',
          path: '/access',
          component: './Access',
        },
        {
          name: 'CRUD 示例',
          path: '/table',
          component: './Table',
        },
      ],
    },
  ],
  npmClient: 'npm',
});
