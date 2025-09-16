import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: '', // 不处理响应数据，直接返回
  },
  // 选择性启用mock功能：只启用缺失的getmues接口
  mock: false,
  
  // 启用代理到后端服务
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
    
    '/datebash': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/datebash': '/datebash' },
    },
  },

  
  layout: false, // 完全禁用 UMI 的布局插件
  define: {
    UMI_APP_BASE_URL: 'http://localhost', // 定义基础 URL
  },
  styles: [
    '@style/global.css', // 使用别名访问全局样式文件
  ],
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
    '@style': require('path').resolve(__dirname, 'src/styles'),
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
        //工作看板
        {
          path: '/xt/workboard',
          component: './WorkBoard',
        },
        // 工作中台
        {
          path: '/xt/workcenter',
          component: './WorkCenter',
        },
        //显示其他页面
        {
          path: '/xt/not-xt-page',
          component: './Notxtpage',
        },
        // 即时通讯
        {
          path: '/xt/im',
          component: './Chat',
        },
        // 科室通知
        {
          path: '/xt/department-notice',
          component: './Notice',
        },
        // 智能质控
        {
          path: '/xt/quick-qc',
          component: './QuickQC',
        },
        //风险事件登记
        {
          path: '/xt/risk-even-registration',
          component: './RiskEventRegistration',
        },
        
      ],
    },
    // 帮我增加404 页面
    {
      path: '*',
      component: '@/components/404',
    },
  ],

  npmClient: 'npm',
});
