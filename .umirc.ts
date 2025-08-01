import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false, // 完全禁用 UMI 的布局插件
  routes: [
    {
      path: '/',
      component: '@/components/EmptyLayout', // 空布局，用于登录页
      routes: [
        {
          path: '/',
          redirect: '/login',
        },
        {
          name: '登录',
          path: '/login',
          component: './Login',
        },
      ],
    },
    {
      path: '/xt',
      component: '@/components/Layout', // 主布局，用于业务页面
      routes: [
        {
          path: '/xt',
          redirect: '/xt/home',
        },
        {
          name: '首页',
          path: '/xt/home',
          component: './Home',
        },
        {
          name: '权限演示',
          path: '/xt/access',
          component: './Access',
        },
        {
          name: 'CRUD 示例',
          path: '/xt/table',
          component: './Table',
        },
      ],
    },
    // 帮我增加404 页面
    {
      path: '*',
      component: '@/components/404',
    }
  ],
  
  npmClient: 'npm',
});
