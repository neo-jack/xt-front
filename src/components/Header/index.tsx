import { FC } from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar';
import PageTitle from '@/components/PageTitle';

interface HeaderProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

const Header: FC<HeaderProps> = ({ collapsed, onToggleCollapsed }) => {
  return (
    <div style={{ 
      background: '#fff', 
      padding: '0 16px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      height: '64px'
    }}>
      {/* 左侧：折叠按钮 + 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapsed}
          style={{
            fontSize: '16px',
            width: 32,
            height: 32,
          }}
        />
        <PageTitle />
      </div>
      
      {/* 右侧：用户头像 */}
      <Avatar />
    </div>
  );
};

export default Header;