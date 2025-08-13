// 主布局组件 - 包含头部、侧边栏、面包屑和内容区域

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

import { withAuthorization } from '@/utils/auth';
import { AppstoreOutlined } from '@ant-design/icons';
import { Layout as AntdLayout } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const { Header: AntdHeader, Sider, Content } = AntdLayout;

const BaseLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false); // 添加这一行

  const toggleCollapsed = () => {
    // 添加这个函数
    setCollapsed(!collapsed);
  };

  

  return (
    <AntdLayout style={{ height: '100vh', minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          background: '#001529',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#A5EAFF',
            fontWeight: 'bold',
            fontSize: collapsed ? '12px' : '14px',
          }}
        >
          <AppstoreOutlined style={{ fontSize: '18px' }} />
          {!collapsed && <span>XT</span>}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <SideBar />
        </div>
      </Sider>

      {/* 主内容区域 */}
      <AntdLayout>
        {/* 头部 */}
        <Header collapsed={collapsed} onToggleCollapsed={toggleCollapsed} />

        {/* 内容区域 */}
        <Content
          style={{
            margin: 0,
            padding: 0,
            background: '#fff',
            minHeight: 'calc(100vh - 80px)', // 减去头部高度并减少底部距离
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              background: '#fff',
              flex: 1,
            }}
          >
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
