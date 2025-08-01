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
      
      现在登录页面(/login)已经独立于AuthLayout，不会经过这个HOC
      这个HOC只处理需要权限保护的页面（除了/login之外的所有页面）
      
      1. 如果用户已登录（有token）：
         - 正常渲染 WrappedComponent
      
      2. 如果用户未登录（无token）：
         - 重定向到 /login
    */
    
    //暂时未写token检测

    
    if (token) {
      // 用户已登录，正常渲染受保护的页面
      return <WrappedComponent />;
    } else {
      // 用户未登录，重定向到登录页
      return <Navigate to="/login" replace />;
    }
  };
}

export default withAuthorization;