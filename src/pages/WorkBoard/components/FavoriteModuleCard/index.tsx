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
  PlayCircleOutlined,
  RadarChartOutlined,
  SafetyOutlined,
  SendOutlined,
  SettingOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Button, Card, Tooltip, message } from 'antd';
import React, { FC, useState } from 'react';

/**
 * 收藏模块接口定义
 */
interface FavoriteModule {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  port?: number;
  projectPath?: string;
  categoryName?: string;
  isFavorite?: boolean;
  addedAt?: string;
}

/**
 * 组件属性接口
 */
interface FavoriteModuleCardProps {
  /** 模块数据 */
  module: FavoriteModule;
  /** 启动模块回调 */
  onStart: (module: FavoriteModule) => void;
  /** 移除收藏回调 */
  onRemove: (module: FavoriteModule) => void;
}

/**
 * 收藏模块卡片组件
 * 功能：
 * 1. 展示模块基本信息（图标、名称）
 * 2. 提供启动按钮，快速启动模块
 * 3. 提供删除按钮，取消收藏
 * 4. 简洁的设计风格，适合工作看板使用
 */
const FavoriteModuleCard: FC<FavoriteModuleCardProps> = ({
  module,
  onStart,
  onRemove,
}) => {
  // 启动状态管理，防止重复点击
  const [starting, setStarting] = useState(false);
  // 删除状态管理，防止重复点击
  const [removing, setRemoving] = useState(false);

  /**
   * 根据图标名称渲染相应的图标
   * 支持Ant Design图标和SVG图标
   */
  const renderIcon = () => {
    const iconName = module.icon;

    if (!iconName) {
      return <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />;
    }

    // 如果是 SVG 图标（以 # 开头）
    if (iconName.startsWith('#')) {
      return (
        <svg style={{ fontSize: '24px', width: '24px', height: '24px' }}>
          <use xlinkHref={iconName} fill="#fff" />
        </svg>
      );
    }

    // Ant Design 图标映射
    const iconMap: Record<string, React.ReactNode> = {
      FileSearchOutlined: (
        <FileSearchOutlined style={{ fontSize: '24px', color: '#fff' }} />
      ),
      DollarOutlined: (
        <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />
      ),
      ShopOutlined: (
        <ShopOutlined style={{ fontSize: '24px', color: '#fff' }} />
      ),
      MobileOutlined: (
        <MobileOutlined style={{ fontSize: '24px', color: '#fff' }} />
      ),
      SendOutlined: (
        <SendOutlined style={{ fontSize: '24px', color: '#fff' }} />
      ),
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
   * 处理启动模块
   */
  const handleStart = async () => {
    if (starting) return; // 防止重复点击

    setStarting(true);
    try {
      await onStart(module);
    } catch (error) {
      console.error('启动模块失败:', error);
    } finally {
      setStarting(false);
    }
  };

  /**
   * 处理取消收藏
   */
  const handleRemove = async () => {
    if (removing) return; // 防止重复点击

    setRemoving(true);
    try {
      await onRemove(module);
    } catch (error) {
      console.error('取消收藏失败:', error);
      message.error('取消收藏失败，请重试');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: 220,
        borderRadius: '0px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: '#F6F9FF',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
      styles={{
        body: {
          padding: '16px',
          position: 'relative',
        },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
    >
      {/* 取消收藏按钮 */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1,
        }}
      >
        <Tooltip title="取消收藏">
          <Button
            type="text"
            shape="circle"
            size="small"
            icon={<CloseOutlined style={{ color: '#ff4d4f' }} />}
            loading={removing}
            onClick={handleRemove}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Tooltip>
      </div>

      {/* 模块图标 */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: '#1890ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
        }}
      >
        {renderIcon()}
      </div>

      {/* 模块信息 */}
      <div>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#333',
            lineHeight: '1.4',
          }}
        >
          {module.name}
        </h3>

        {/* 端口信息和启动按钮 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          {module.port && (
            <span
              style={{
                fontSize: '12px',
                color: '#999',
                background: '#f8f9fa',
                padding: '4px 8px',
                borderRadius: '12px',
              }}
            >
              端口: {module.port}
            </span>
          )}

          <Tooltip title="启动模块">
            <Button
              type="primary"
              shape="circle"
              icon={<PlayCircleOutlined />}
              loading={starting}
              onClick={handleStart}
              style={{
                background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)',
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default FavoriteModuleCard;
