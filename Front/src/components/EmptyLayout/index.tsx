//-----------------------------------------------
// 空布局组件 - 用于权限控制
//
// 
//-----------------------------------------------
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import withAuthorization from '@/utils/auth/withAuthorization';

const EmptyLayout: FC = () => {

  return (

    <div style={{ width: '100%', height: '100vh' }}>
      {/* 完全空的布局，只渲染子路由 */}
      <Outlet />
    </div>
  );
};

export default withAuthorization(EmptyLayout);
