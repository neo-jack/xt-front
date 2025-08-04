import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false, // 完全禁用 UMI 的布局插件
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
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
          redirect: '/xt/workboard',
        },
        {
          name: '工作看板',
          path: '/xt/workboard',
          component: './WorkBoard',
        },
        {
          name: '工作中台',
          path: '/xt/workcenter',
          component: './WorkCenter',
        },
        {
          name: '快速工作入口',
          path: '/xt/quickwork',
          component: './QuickWork',
        },
        {
          name: '快速工作子功能1',
          path: '/xt/quickwork/sub1',
          component: './QuickWork/Sub1',
        },
        {
          name: '快速工作子功能2',
          path: '/xt/quickwork/sub2',
          component: './QuickWork/Sub2',
        },
        {
          name: '聊天',
          path: '/xt/chat',
          component: './Chat',
        },
        {
          name: '需求直报',
          path: '/xt/report',
          component: './Report',
        },
        {
          name: '科室通知',
          path: '/xt/notice',
          component: './Notice',
        },
        {
          name: '事务流程',
          path: '/xt/workflow',
          component: './Workflow',
        },
        {
          name: '杏和智答',
          path: '/xt/ai',
          component: './AI',
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
