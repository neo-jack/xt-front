import ModuleCard from '@/components/Card';
import { getFavoriteList, type FavoriteItem } from '@/services/favorite/get';
import { removeFavorite } from '@/services/favorite/remove';
import type { SubModule } from '@/constants/workboard';
import { StarOutlined } from '@ant-design/icons';
import { Card, Empty, message, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

/**
 * 将FavoriteItem转换为SubModule格式
 * @param favoriteItem - 收藏项数据
 * @returns SubModule - 模块数据
 */
const convertFavoriteToModule = (favoriteItem: FavoriteItem): SubModule => {
  return {
    id: favoriteItem.id,
    name: favoriteItem.name,
    description: favoriteItem.description,
    icon: favoriteItem.icon,
    port: favoriteItem.port,
    projectPath: favoriteItem.url, // 使用url作为projectPath
    isFavorite: true, // 收藏列表中的项目都是已收藏的
  };
};

/**
 * 工作看板页面组件
 * 功能：
 * 1. 展示用户收藏的模块
 * 2. 支持快速启动模块
 * 3. 支持取消收藏操作
 * 4. 响应式布局设计
 */
const WorkBoard: FC = () => {
  // 状态管理
  const [favoriteModules, setFavoriteModules] = useState<SubModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 获取收藏模块列表
   * 页面加载时调用，获取用户的所有收藏模块
   */
  const fetchFavoriteModules = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('[WorkBoard] 开始获取收藏列表');
      const result = await getFavoriteList();

      if (result.success && result.data) {
        // 转换API数据格式为组件需要的格式
        const modules: SubModule[] = result.data.map(convertFavoriteToModule);
        setFavoriteModules(modules);
        console.log('[WorkBoard] 成功获取收藏列表，共', modules.length, '项');
      } else {
        setError(result.message || '获取收藏列表失败');
        console.error('[WorkBoard] 获取收藏列表失败:', result.message);
      }
    } catch (err) {
      console.error('[WorkBoard] 获取收藏列表错误:', err);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理取消收藏
   * @param module - 要取消收藏的模块
   */
  const handleRemoveFavorite = async (module: SubModule) => {
    try {
      console.log('[WorkBoard] 开始取消收藏:', module.id);
      const result = await removeFavorite({ modulesid: module.id });

      if (result.success) {
        // 从本地状态中移除该模块
        setFavoriteModules((prev) =>
          prev.filter((item) => item.id !== module.id),
        );
        message.success(result.message || '已取消收藏');
        console.log('[WorkBoard] 取消收藏成功:', module.id);
      } else {
        message.error(result.message || '取消收藏失败');
        console.error('[WorkBoard] 取消收藏失败:', result.message);
      }
    } catch (error) {
      console.error('[WorkBoard] 取消收藏错误:', error);
      message.error('取消收藏时发生错误，请稍后重试');
    }
  };

  // 页面加载时获取收藏列表
  useEffect(() => {
    fetchFavoriteModules();
  }, []);

  /**
   * 渲染页面内容
   */
  const renderContent = () => {
    // 加载状态
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: '#666' }}>正在加载收藏模块...</p>
        </div>
      );
    }

    // 错误状态
    if (error) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <p>加载失败</p>
              <p style={{ color: '#999', fontSize: '14px' }}>{error}</p>
              <a onClick={fetchFavoriteModules} style={{ color: '#1890ff' }}>
                重新加载
              </a>
            </div>
          }
        />
      );
    }

    // 空状态
    if (favoriteModules.length === 0) {
      return (
        <Empty
          image={<StarOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description={
            <div>
              <p>暂无收藏模块</p>
              <p style={{ color: '#999', fontSize: '14px' }}>
                前往工作中台收藏常用模块，在此处快速访问
              </p>
            </div>
          }
        />
      );
    }

    // 模块列表
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {favoriteModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            showFavorite={false}
            showRemove={true}
            onRemove={() => handleRemoveFavorite(module)}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        height: '100%',
      }}
    >
      {/* 收藏模块展示区域 */}
      <Card
        variant="borderless"
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StarOutlined style={{ marginRight: 8, color: '#faad14' }} />
            常用模块
            {!loading && favoriteModules.length > 0 && (
              <span style={{ color: '#999', fontSize: '14px', marginLeft: 8 }}>
                ({favoriteModules.length}个模块)
              </span>
            )}
          </div>
        }
        styles={{
          body: {
            padding: 24,
            paddingBottom: 40,
            height: 'calc(100vh - 176px)',
            overflow: 'auto',
          },
        }}
      >
        {renderContent()}
      </Card>
    </div>
  );
};

export default WorkBoard;
