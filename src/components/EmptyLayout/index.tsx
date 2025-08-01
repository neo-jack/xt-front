// 空布局组件 - 用于登录页等不需要任何布局的页面
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const EmptyLayout: FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {/* 完全空的布局，只渲染子路由 */}
      <Outlet />
    </div>
  );
};

export default EmptyLayout;