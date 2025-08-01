// 权限检查高阶组件 - UMI版本
// 这个组件负责检查用户权限并决定显示哪个页面

import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
// 注释掉Redux相关导入，现在使用localStorage
// import { useAppSelector, useAppDispatch } from '@/app/hooks';

// 权限检查的高阶组件
function withAuthorization(WrappedComponent: FC) {
  return () => {
    // 获取当前路由位置
    const { pathname } = useLocation();
    
    // 使用localStorage检查token和用户信息
    // 后续可以轻松替换为Redux状态管理
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    
    /*
      权限检查逻辑：
      
      1. 如果用户已登录（有token）：
         - 访问 /login → 重定向到 /home
         - 访问其他页面 → 正常显示
         
      2. 如果用户未登录（无token）：
         - 访问 /login → 正常显示登录页
         - 访问其他页面 → 重定向到 /login
    */
    
    if (token) {
      // 用户已登录
      if (pathname === '/login') {
        // 已登录用户访问登录页，重定向到首页
        return <Navigate to="/home" replace />;
      }
      
      // 检查是否有用户详细信息
      if (userInfo) {
        // 有完整信息，正常渲染组件
        return <WrappedComponent />;
      } else {
        // 有token但没有用户详细信息，可能需要重新获取
        // 这里可以调用获取用户信息的API
        console.log('需要获取用户详细信息');
        return <WrappedComponent />;
      }
    } else {
      // 用户未登录
      if (pathname === '/login') {
        // 未登录用户访问登录页，正常显示
        return <WrappedComponent />;
      } else {
        // 未登录用户访问其他页面，重定向到登录页
        return <Navigate to="/login" replace />;
      }
    }
  };
}

export default withAuthorization;