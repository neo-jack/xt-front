import { setGlobalSystemInfo } from '@/models/usesystem';
import { getSystemInfo } from '@/services/system';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, useEffect } from 'react';
import PageTitle from './PageTitle';
import UserAllActions from './usesettle/all';

interface HeaderProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

const Header: FC<HeaderProps> = ({ collapsed, onToggleCollapsed }) => {
  useEffect(() => {
    //-----/api/system/info-----
    getSystemInfo()
      .then((res) => {
        // 获得的api保存到constant上面去
        if (res.code === 0 && res.data) {
          setGlobalSystemInfo(res.data);
          console.log('系统信息已保存到全局存储:', res.data);
        } else {
          console.error('获取系统信息失败:', res.msg);
        }
      })
      .catch((error) => {
        console.error('获取系统信息异常:', error);
      });
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        height: '64px',
      }}
    >
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

      {/* 右侧：用户头像与菜单 */}
      <UserAllActions />
    </div>
  );
};

export default Header;
