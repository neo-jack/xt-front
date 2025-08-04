import { SubModule } from '@/types/workcenter';
import {
  AppstoreOutlined,
  PlayCircleOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Card, message, Tooltip } from 'antd';
import React from 'react';

interface ModuleCardProps {
  /** 模块数据对象，包含模块的基本信息 */
  module: SubModule;
  /** 所属分类名称，用于收藏功能的分类标识 */
  categoryName: string;
  /** 收藏状态切换回调函数 */
  onFavoriteToggle: (module: SubModule, categoryName: string) => void;
  /** 模块启动回调函数 */
  onLaunch: (module: SubModule) => void;
}

/**
 * 模块卡片组件
 * 展示单个业务模块的详细信息，提供收藏和启动功能
 *
 * @param module - 模块数据
 * @param categoryName - 分类名称
 * @param onFavoriteToggle - 收藏切换处理函数
 * @param onLaunch - 启动处理函数
 */

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  categoryName,
  onFavoriteToggle,
  onLaunch,
}) => {
  /**
   * 处理收藏按钮点击事件
   * 阻止事件冒泡，调用父组件的收藏切换函数，并显示操作结果提示
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡到卡片点击事件
    onFavoriteToggle(module, categoryName); // 调用父组件的收藏切换函数
    // 根据当前收藏状态显示相应的提示信息
    message.success(module.isFavorite ? '已取消收藏' : '已添加到收藏');
  };
  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡到卡片点击事件
    onLaunch(module); // 调用父组件的启动函数
  };

  return (
    <Card
      hoverable
      style={{
        width: 280,
        margin: '12px',
        borderRadius: '0px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: '#F6F9FF',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
      styles={{
        body: {
          padding: '20px',
          position: 'relative',
        }
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
      {/* 收藏按钮 */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 1,
      }}>
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
              background: 'rgba(255,255,255,0.8)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Tooltip>
      </div>

      {/* 模块图标 */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      }}>
        <AppstoreOutlined style={{ 
          fontSize: '24px', 
          color: '#fff',
        }} />
      </div>

      {/* 模块信息 */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          color: '#333',
          lineHeight: '1.4',
        }}>
          {module.name}
        </h3>
        
        <p style={{
          color: '#666',
          fontSize: '14px',
          lineHeight: '1.5',
          margin: '0 0 16px 0',
          height: '42px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {module.description}
        </p>

        {/* 端口信息和启动按钮 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0',
        }}>
          {module.port && (
            <span style={{
              fontSize: '12px',
              color: '#999',
              background: '#f8f9fa',
              padding: '4px 8px',
              borderRadius: '12px',
            }}>
              端口: {module.port}
            </span>
          )}
          
          <Tooltip title="启动模块">
            <Button
              type="primary"
              shape="circle"
              icon={<PlayCircleOutlined />}
              onClick={handleLaunchClick}
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

export default ModuleCard;
