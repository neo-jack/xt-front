import type { SubModule } from '@/constants/workboard';
import * as Icons from '@ant-design/icons';
import {
  AppstoreOutlined,
  CloseOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React from 'react';
import './card.less';
import { getIconComponent, ICON_COLOR_MAP, COLOR_THEMES } from './iconMap';

interface ModuleCardProps {
  /** 模块数据 - 直接传入完整的模块信息 */
  module: SubModule;
  /** 点击事件处理 */
  onClick?: (module: SubModule) => void;
  /** 是否显示收藏按钮 */
  showFavorite?: boolean;
  /** 收藏状态切换事件 */
  onFavoriteToggle?: (module: SubModule) => void;
  /** 是否显示移除按钮 */
  showRemove?: boolean;
  /** 移除事件处理 */
  onRemove?: (module: SubModule) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/**
 * 获取图标背景颜色主题
 * @param iconName 图标名称
 * @returns 颜色主题对象
 */
const getIconTheme = (iconName: string) => {
  const themeName = ICON_COLOR_MAP[iconName] || ICON_COLOR_MAP.default;
  return COLOR_THEMES[themeName] || COLOR_THEMES.purple;
};

/**
 * 通用模块卡片组件
 * 统一的模块卡片样式，支持收藏和启动功能
 *
 * 功能特点：
 * 1. 直接接收完整的模块数据，无需硬编码查找
 * 2. 支持收藏功能（可选）
 * 3. 支持启动功能（可选）
 * 4. 支持动态图标渲染和主题色彩
 * 5. 支持自定义样式和类名
 * 6. 显示模块描述信息
 */
const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onClick,
  showFavorite = false,
  onFavoriteToggle,
  showRemove = false,
  onRemove,
  style,
  className,
}) => {
  if (!module) {
    return (
      <Card
        style={{
          width: 200,
          height: 160,
          margin: '8px',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          background: '#F6F9FF',
          ...style,
        }}
        styles={{
          body: { padding: '16px' },
        }}
        className={className}
      >
        <div style={{ textAlign: 'center' }}>
          <Icons.QuestionCircleOutlined
            style={{ fontSize: 32, color: '#999' }}
          />
          <div style={{ marginTop: 8, color: '#999' }}>模块信息缺失</div>
        </div>
      </Card>
    );
  }

  // 获取图标主题
  const iconTheme = getIconTheme(module.icon || 'AppstoreOutlined');

  // 动态获取图标组件
  const getIcon = () => {
    if (!module.icon) {
      return getIconComponent('AppstoreOutlined', { fontSize: 24, color: '#fff' });
    }

    // 处理自定义图标（以#开头）
    if (module.icon.startsWith('#')) {
      return (
        <i
          className={`iconfont ${module.icon}`}
          style={{ fontSize: 24, color: '#fff' }}
        />
      );
    }

    // 使用统一的图标映射函数
    return getIconComponent(module.icon, { fontSize: 24, color: '#fff' });
  };

  const handleClick = () => {
    if (onClick) {
      onClick(module);
    } else {
      // 默认行为：根据端口或URL打开新窗口
      if (module.projectPath) {
        window.open(module.projectPath, '_blank');
      } else if (module.port) {
        const baseUrl = process.env.UMI_APP_BASE_URL || 'http://localhost';
        const url = `${baseUrl}:${module.port}`;
        window.open(url, '_blank');
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(module);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(module);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{
        width: 200,
        height: 180,
        margin: '8px',
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: '#F6F9FF',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
      styles={{
        body: {
          padding: '16px',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      className={className}
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
            top: '12px',
            right: '12px',
            zIndex: 1,
            display: 'flex',
            gap: '4px',
          }}
        >
          {showFavorite && (
            <Tooltip title={module.isFavorite ? '取消收藏' : '添加收藏'}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={
                  module.isFavorite ? (
                    <StarFilled style={{ color: '#faad14' }} />
                  ) : (
                    <StarOutlined style={{ color: '#bbb' }} />
                  )
                }
                onClick={handleFavoriteClick}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Tooltip>
          )}
          {showRemove && (
            <Tooltip title="移除">
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined style={{ color: '#ff4d4f' }} />}
                onClick={handleRemoveClick}
                style={{
                  background: 'rgba(255,255,255,0.9)',
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
          background: iconTheme.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          boxShadow: iconTheme.shadow,
          alignSelf: 'center',
        }}
      >
        {getIcon()}
      </div>

      {/* 模块信息 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 4px 0',
            color: '#333',
            lineHeight: '1.4',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {module.name}
        </h3>
        {module.description && (
          <p
            style={{
              fontSize: '12px',
              color: '#666',
              margin: '0',
              lineHeight: '1.3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {module.description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ModuleCard;
