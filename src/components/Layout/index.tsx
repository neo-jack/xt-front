// 主布局组件 - 包含头部、侧边栏、面包屑和内容区域
import { FC } from 'react';
import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import Breadcrumb from '@/components/Breadcrumb';
import SideBar from '@/components/SideBar';
import withAuthorization from '@/utils/auth';

const { Header, Sider, Content } = AntdLayout;

const BaseLayout: FC = () => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.1)' }}>
          {/* Logo 区域 */}
        </div>
        <SideBar />
      </Sider>
      
      {/* 主内容区域 */}
      <AntdLayout>
        {/* 头部 */}
        <Header style={{ 
          background: '#fff', 
          padding: '0 16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            管理系统
          </div>
          <Avatar />
        </Header>
        
        {/* 内容区域 */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb />
          <div style={{ 
            padding: 24, 
            background: '#fff', 
            minHeight: 360,
            borderRadius: '6px'
          }}>
            <Outlet />
          </div>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

// 使用 withAuthorization 包裹，添加权限检查功能
const Layout = withAuthorization(BaseLayout);

export default Layout;