/**
 * 工作中台左侧菜单组件
 * 功能：显示业务模块分类菜单，支持选中状态管理和点击事件处理
 */
import { WORK_CENTER_MENUS } from '@/constants';
import {
  ApiOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  CarOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  MonitorOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';

/**
 * 左侧菜单组件的属性接口
 */
interface WorkCenterSidebarProps {
  /** 当前选中的菜单项key值 */
  selectedKey: string;
  /** 菜单项点击回调函数 */
  onSelect: (key: string) => void;
}

/**
 * 图标映射对象
 * 将字符串类型的图标名称映射为实际的图标组件
 * 用于动态渲染菜单项图标
 */
const iconMap = {
  AppstoreOutlined, // 主体业务
  ExperimentOutlined, // 样本管理、实验室管理
  SafetyOutlined, // 质量控制
  BarChartOutlined, // BI分析
  BookOutlined, // 知识库
  DatabaseOutlined, // 样本库
  CarOutlined, // 外勤管理
  ApiOutlined, // 第三方
  ToolOutlined, // 维护管理
  DesktopOutlined, // 设计器
  SafetyCertificateOutlined, // 生物安全
  MonitorOutlined, // POCT管理
};

/**
 * 工作中台左侧菜单栏组件
 *
 * @param selectedKey - 当前选中的菜单项
 * @param onSelect - 菜单项选择回调函数
 */
const WorkCenterSidebar: React.FC<WorkCenterSidebarProps> = ({
  selectedKey,
  onSelect,
}) => {
  /**
   * 根据菜单配置数据生成菜单项
   * 动态匹配图标组件，如果找不到对应图标则使用默认图标
   */
  const menuItems = WORK_CENTER_MENUS.map((category) => {
    // 根据配置中的图标名称获取对应的图标组件
    const IconComponent = iconMap[category.icon as keyof typeof iconMap];

    return {
      key: category.key, // 菜单项唯一标识
      icon: IconComponent ? <IconComponent /> : <AppstoreOutlined />, // 图标组件
      label: category.name, // 菜单项显示名称
    };
  });
  const handleMenuClick = ({ key }: { key: string }) => {
    onSelect(key);
  };

  return (
    <div style={{ height: '100%', borderRight: '1px solid #f0f0f0' }}>
      {/* 菜单列表区域 */}
      <Menu
        mode="inline" // 内联模式，适合侧边栏布局
        selectedKeys={[selectedKey]} // 当前选中的菜单项
        items={menuItems} // 菜单项数据
        onClick={handleMenuClick} // 点击事件处理
        style={{
          height: '100%', // 占满整个高度
          borderRight: 0, // 移除右边框，避免重复
          fontSize: '16px', // 增大字体
        }}
      />
    </div>
  );
};

export default WorkCenterSidebar;
