// 面包屑导航组件
import { FC } from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Breadcrumb: FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // 路径映射表
  const pathNameMap: Record<string, string> = {
    'xt': '系统',
    'home': '首页',
    'access': '权限演示',
    'table': 'CRUD 示例',
  };

  const breadcrumbItems = [
    {
      title: (
        <>
          <HomeOutlined />
          <span>首页</span>
        </>
      ),
    },
  ];

  // 生成面包屑项目
  pathSnippets.forEach((snippet, index) => {
    if (snippet !== 'xt') { // 跳过 'xt' 前缀
      const title = pathNameMap[snippet] || snippet;
      breadcrumbItems.push({
        title,
      });
    }
  });

  return (
    <AntdBreadcrumb
      style={{ margin: '16px 0' }}
      items={breadcrumbItems}
    />
  );
};

export default Breadcrumb;