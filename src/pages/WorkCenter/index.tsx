import ModuleCard from '@/components/Card';
import { SubModule, WORK_CENTER_MENUS } from '@/constants/workboard';
import favoriteService from '@/services/favorite';
import { Empty, message } from 'antd';
import React, { useEffect, useState } from 'react';
import WorkCenterSidebar from './components/Sidebar';

const WorkCenter: React.FC = () => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('master');
  const [favoriteModuleIds, setFavoriteModuleIds] = useState<Set<string>>(
    new Set(),
  );

  // 初始化收藏状态
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const result =
          await favoriteService.FavoriteController.queryFavoriteList({});
        if (result.success && result.data?.list) {
          const validIds = result.data.list
            .filter((fav) => fav.id)
            .map((fav) => fav.id!);
          setFavoriteModuleIds(new Set(validIds));
        }
      } catch (error) {
        console.error('加载收藏列表失败:', error);
      }
    };
    loadFavorites();
  }, []);

  // 获取当前选中分类的模块
  const getCurrentModules = () => {
    const category = WORK_CENTER_MENUS.find(
      (cat) => cat.key === selectedCategoryKey,
    );
    if (!category) return [];

    return category.subModules.map((module) => ({
      ...module,
      isFavorite: favoriteModuleIds.has(module.id),
    }));
  };

  // 获取当前分类名称
  const getCurrentCategoryName = () => {
    const category = WORK_CENTER_MENUS.find(
      (cat) => cat.key === selectedCategoryKey,
    );
    return category?.name || '';
  };

  // 处理菜单选择
  const handleMenuSelect = (key: string) => {
    setSelectedCategoryKey(key);
  };

  // 处理收藏切换
  const handleFavoriteToggle = async (
    module: SubModule,
    categoryName: string,
  ) => {
    try {
      const isFavorited = favoriteModuleIds.has(module.id);

      if (isFavorited) {
        // 移除收藏
        const result = await favoriteService.FavoriteController.removeFavorite({
          moduleId: module.id,
        });
        if (result.success) {
          setFavoriteModuleIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(module.id);
            return newSet;
          });
          message.success('已取消收藏');
        } else {
          message.error(result.errorMessage || '取消收藏失败');
        }
      } else {
        // 添加收藏
        const result = await favoriteService.FavoriteController.addFavorite({
          moduleId: module.id,
          moduleName: module.name,
          description: module.description,
          icon: module.icon,
          port: module.port,
          projectPath: module.projectPath,
          categoryName,
        });
        if (result.success) {
          setFavoriteModuleIds((prev) => {
            const newSet = new Set(prev);
            newSet.add(module.id);
            return newSet;
          });
          message.success('已添加到收藏');
        } else {
          message.error(result.errorMessage || '添加收藏失败');
        }
      }
    } catch (error) {
      message.error(`操作失败: ${error}`);
    }
  };

  const modules = getCurrentModules();

  return (
    <div
      style={{
        height: 'calc(100vh - 88px)',
        display: 'flex',
        backgroundColor: '#F6F9FF',
      }}
    >
      {/* 左侧菜单栏 */}
      <div style={{ width: '280px', backgroundColor: '#fff', height: '100%' }}>
        <WorkCenterSidebar
          selectedKey={selectedCategoryKey}
          onSelect={handleMenuSelect}
        />
      </div>

      {/* 右侧内容区 */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FAFBFF',
          padding: '20px',
          overflow: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignContent: 'flex-start',
        }}
      >
        {modules.length === 0 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <Empty description="暂无模块" />
          </div>
        ) : (
          modules.map((module) => (
            <ModuleCard
              key={module.id}
              id={module.id}
              showFavorite={true}
              isFavorite={module.isFavorite}
              onFavoriteToggle={() =>
                handleFavoriteToggle(module, getCurrentCategoryName())
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WorkCenter;
