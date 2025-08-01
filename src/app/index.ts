// 统一导出Redux相关的基础内容
// 具体的业务模块（如用户登录、权限管理等）需要时可以在各自的页面中创建slice

export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

// 注意：具体的业务actions和selectors应该在各自的页面模块中定义和导出
// 例如：在 pages/login/slice.ts 中定义用户相关的slice
// 例如：在 pages/user/slice.ts 中定义用户管理相关的slice