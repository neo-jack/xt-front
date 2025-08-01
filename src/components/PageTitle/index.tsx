// 页面标题组件 - 获取当前页面的标题（面包屑最后一级）
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle: FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  // 路径映射表
  const pathNameMap: Record<string, string> = {
    xt: '系统',
    home: '首页',
    access: '权限演示',
    table: 'CRUD 示例',
  };

  // 获取最后一级路径对应的标题
  const getPageTitle = () => {
    if (pathSnippets.length === 0) {
      return '首页';
    }

    // 获取最后一个路径片段（跳过 'xt' 前缀）
    const lastSnippet = pathSnippets[pathSnippets.length - 1];

    if (lastSnippet === 'xt' || pathSnippets.length === 1) {
      return '首页';
    }

    return pathNameMap[lastSnippet] || lastSnippet;
  };

  return (
    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{getPageTitle()}</div>
  );
};

export default PageTitle;
