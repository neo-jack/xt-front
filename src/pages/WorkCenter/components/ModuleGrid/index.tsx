import ModuleCard from '@/pages/WorkCenter/components/ModuleCard';
import { SubModule } from '@/types/workcenter';
import { Empty } from 'antd';
import React from 'react';

interface ModuleGridProps {
  modules: SubModule[];
  categoryName: string;
  onFavoriteToggle: (module: SubModule, categoryName: string) => void;
  onLaunch: (module: SubModule) => void;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({
  modules,
  categoryName,
  onFavoriteToggle,
  onLaunch,
}) => {
  if (!modules || modules.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
        }}
      >
        <Empty description="暂无模块" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
      }}
    >
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          categoryName={categoryName}
          onFavoriteToggle={onFavoriteToggle}
          onLaunch={onLaunch}
        />
      ))}
    </div>
  );
};

export default ModuleGrid;
