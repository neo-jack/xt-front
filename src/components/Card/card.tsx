import { WORK_CENTER_MENUS } from '@/constants';
import * as Icons from '@ant-design/icons';
import {
  AppstoreOutlined,
  BugOutlined,
  CarOutlined,
  CloseOutlined,
  DatabaseOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  FileSearchOutlined,
  MedicineBoxOutlined,
  MobileOutlined,
  RadarChartOutlined,
  SafetyOutlined,
  SendOutlined,
  SettingOutlined,
  ShopOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React from 'react';
import './card.less';

interface ModuleCardProps {
  id: string;
  onClick?: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
}

/**
 * 获取图标背景颜色主题
 * @param iconName 图标名称
 * @returns ColorTheme
 */
const getIconComponent = (iconName: string): React.ReactNode => {
  // Ant Design 图标映射
  const iconMap: Record<string, React.ReactNode> = {
    FileSearchOutlined: (
      <FileSearchOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    DollarOutlined: (
      <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    ShopOutlined: <ShopOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    MobileOutlined: (
      <MobileOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    SendOutlined: <SendOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    CarOutlined: <CarOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    ExperimentOutlined: (
      <ExperimentOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    MedicineBoxOutlined: (
      <MedicineBoxOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    RadarChartOutlined: (
      <RadarChartOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    BugOutlined: <BugOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    DatabaseOutlined: (
      <DatabaseOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    EnvironmentOutlined: (
      <EnvironmentOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    SafetyOutlined: (
      <SafetyOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    SettingOutlined: (
      <SettingOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
    AppstoreOutlined: (
      <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />
    ),
  };

  return (
    iconMap[iconName] || (
      <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />
    )
  );
};

/**
 * 通用模块卡片组件
 * 统一的模块卡片样式，支持收藏和启动功能
 *
 * 功能特点：
 * 1. 只需传入模块ID，自动获取图标和名称
 * 2. 支持收藏功能（可选）
 * 3. 支持启动功能（可选）
 * 4. 支持动态图标渲染
 * 5. 不显示端口信息
 */
const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  onClick,
  showFavorite = false,
  isFavorite = false,
  onFavoriteToggle,
  showRemove = false,
  onRemove,
}) => {
  // 查找模块信息
  const findModule = () => {
    for (const category of WORK_CENTER_MENUS) {
      const module = category.subModules.find((sub) => sub.id === id);
      if (module) {
        return {
          ...module,
          categoryName: category.name,
        };
      }
    }
    return null;
  };

  const moduleInfo = findModule();

  if (!moduleInfo) {
    return (
      <Card
        style={{
          width: 220,
          margin: '12px',
          borderRadius: '0px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          background: '#F6F9FF',
        }}
        styles={{
          body: { padding: '16px' },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icons.QuestionCircleOutlined
            style={{ fontSize: 32, color: '#999' }}
          />
          <div style={{ marginTop: 8 }}>未知模块</div>
        </div>
      </Card>
    );
  }

  // 动态获取图标组件
  const getIcon = () => {
    if (!moduleInfo.icon) {
      return <Icons.AppstoreOutlined style={{ fontSize: 24, color: '#fff' }} />;
    }

    // 处理自定义图标（以#开头）
    if (moduleInfo.icon.startsWith('#')) {
      return (
        <i
          className={`iconfont ${moduleInfo.icon}`}
          style={{ fontSize: 24, color: '#fff' }}
        />
      );
    }

    // 优先使用图标映射函数
    const mappedIcon = getIconComponent(moduleInfo.icon);
    if (mappedIcon) {
      // 调整映射图标的尺寸以匹配原有样式
      return React.cloneElement(mappedIcon as React.ReactElement, {
        style: { fontSize: 24, color: '#fff' },
      });
    }

    // 处理Ant Design图标（兜底）
    const IconComponent = (Icons as any)[moduleInfo.icon];
    if (IconComponent) {
      return <IconComponent style={{ fontSize: 24, color: '#fff' }} />;
    }

    // 默认图标
    return <Icons.AppstoreOutlined style={{ fontSize: 24, color: '#fff' }} />;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 默认行为：根据端口打开新窗口
      if (moduleInfo && moduleInfo.port) {
        const baseUrl = process.env.UMI_APP_BASE_URL || 'http://localhost';
        const url = `${baseUrl}:${moduleInfo.port}`;
        window.open(url, '_blank');
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{
        width: 200,
        height: 160,
        margin: '8px',
        borderRadius: '8px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: '#F6F9FF',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      styles={{
        body: {
          padding: '16px',
          position: 'relative',
        },
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 8px 30px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 4px 20px rgba(0,0,0,0.08)';
      }}
    >
      {/* 右上角按钮区域 */}
      {(showFavorite || showRemove) && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 1,
          }}
        >
          {showFavorite && (
            <Tooltip title={isFavorite ? '取消收藏' : '添加收藏'}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={
                  isFavorite ? (
                    <StarFilled style={{ color: '#faad14' }} />
                  ) : (
                    <StarOutlined style={{ color: '#bbb' }} />
                  )
                }
                onClick={handleFavoriteClick}
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Tooltip>
          )}
          {showRemove && (
            <Tooltip title="取消收藏">
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined style={{ color: '#ff4d4f' }} />}
                onClick={handleRemoveClick}
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Tooltip>
          )}
        </div>
      )}

      {/* 模块图标 */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#1890ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
        }}
      >
        {getIcon()}
      </div>

      {/* 模块信息 */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0',
            color: '#333',
            lineHeight: '1.4',
            textAlign: 'center',
          }}
        >
          {moduleInfo.name}
        </h3>
      </div>
    </Card>
  );
};

export default ModuleCard;
