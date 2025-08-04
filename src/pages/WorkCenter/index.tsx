import { WORK_CENTER_MENUS } from '@/constants';
import favoriteService from '@/services/favorite';
import { SubModule } from '@/types/workcenter';
import { startModule } from '@/utils/moduleRunner';
import { Card, Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ModuleGrid from './components/ModuleGrid';
import WorkCenterSidebar from './components/Sidebar';

const { Sider, Content } = Layout;

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

  // 处理模块启动
  const handleModuleLaunch = async (module: SubModule) => {
    try {
      const success = await startModule(module);
      if (success) {
        message.success(`${module.name} 启动成功！端口: ${module.port}`);
      } else {
        message.error(`${module.name} 启动失败`);
      }
    } catch (error) {
      message.error(`启动模块时发生错误: ${error}`);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 112px)' }}>
      <Layout style={{ height: '100%' }}>
        <Sider width={240} style={{ backgroundColor: '#fff' }}>
          <WorkCenterSidebar
            selectedKey={selectedCategoryKey}
            onSelect={handleMenuSelect}
          />
        </Sider>
        <Content style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
          <Card
            title={getCurrentCategoryName()}
            style={{ height: '100%' }}
            bodyStyle={{ height: 'calc(100% - 57px)', overflow: 'auto' }}
          >
            <ModuleGrid
              modules={getCurrentModules()}
              categoryName={getCurrentCategoryName()}
              onFavoriteToggle={handleFavoriteToggle}
              onLaunch={handleModuleLaunch}
            />
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default WorkCenter;
