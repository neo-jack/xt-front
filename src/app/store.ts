import { configureStore } from '@reduxjs/toolkit';

// Redux store - 全局状态管理中心
// 业务模块可以动态添加自己的 slice
export const store = configureStore({
  reducer: {
    // 业务模块在需要时添加对应的 slice
    // 例如: user: userSlice, product: productSlice
  },
});

// TypeScript 类型定义
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
