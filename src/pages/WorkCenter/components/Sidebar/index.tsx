/**
 * 工作中台左侧菜单组件
 * 功能：显示业务模块分类菜单，支持选中状态管理和点击事件处理
 * 重构：使用 API 数据而非硬编码常量
 */
import type { MenuCategory } from '@/constants/workboard';
import { getIconComponent } from '@/components/Card/iconMap';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, Empty } from 'antd';
import React from 'react';

/**
 * 左侧菜单组件的属性接口
 */
interface WorkCenterSidebarProps {
  /** 分类列表数据 */
  categories: MenuCategory[];
  /** 当前选中的分类名称 */
  selectedCategoryName: string;
  /** 菜单项点击回调函数 */
  onSelect: (categoryName: string) => void;
}

/**
 * 工作中台左侧菜单栏组件
 *
 * @param categories - 分类列表数据
 * @param selectedCategoryName - 当前选中的分类名称
 * @param onSelect - 菜单项选择回调函数
 */
const WorkCenterSidebar: React.FC<WorkCenterSidebarProps> = ({
  categories,
  selectedCategoryName,
  onSelect,
}) => {
  /**
   * 根据分类数据生成菜单项
   * 使用统一的图标映射函数动态渲染图标
   */
  const menuItems = categories.map((category) => {
    // 使用统一的图标组件函数
    const icon = getIconComponent(category.icon || 'AppstoreOutlined', {
      fontSize: 16,
      color: 'inherit',
    });

    return {
      key: category.name, // 使用分类名称作为菜单项唯一标识
      icon, // 图标组件
      label: category.name, // 菜单项显示名称
    };
  });

  const handleMenuClick = ({ key }: { key: string }) => {
    onSelect(key);
  };

  // 如果没有分类数据，显示空状态
  if (categories.length === 0) {
    return (
      <div style={{ height: '100%', borderRight: '1px solid #f0f0f0', padding: '20px' }}>
        <Empty 
          description="暂无分类数据" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: '60px' }}
        />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', borderRight: '1px solid #f0f0f0' }}>
      {/* 标题区域 */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: '#fafafa',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          业务分类
        </h3>
      </div>

      {/* 菜单列表区域 */}
      <Menu
        mode="inline" // 内联模式，适合侧边栏布局
        selectedKeys={[selectedCategoryName]} // 当前选中的分类名称
        items={menuItems} // 菜单项数据
        onClick={handleMenuClick} // 点击事件处理
        style={{
          height: 'calc(100% - 57px)', // 减去标题区域高度
          borderRight: 0, // 移除右边框，避免重复
          fontSize: '14px', // 调整字体大小
        }}
      />
    </div>
  );
};

export default WorkCenterSidebar;
