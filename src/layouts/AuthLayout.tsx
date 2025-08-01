// 权限布局组件 - 所有路由的统一入口
// 这是一个空的容器组件，被 withAuthorization 包裹后负责权限控制

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import withAuthorization from '@/components/withAuthorization';

// 基础的空布局组件
const BaseAuthLayout: FC = () => {
  return (
    <div>
      {/* Outlet 会渲染匹配的子路由组件 */}
      <Outlet />
    </div>
  );
};

// 使用 withAuthorization 包裹，添加权限检查功能
const AuthLayout = withAuthorization(BaseAuthLayout);

export default AuthLayout;