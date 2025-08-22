import { Card } from 'antd';
import { FC } from 'react';

const Notxtpage: FC = () => {
  return (
    <div>
      <Card title="功能开发中" variant="borderless">
        <p>此功能正在开发中，敬请期待...</p>
        <p>如果您需要访问特定功能，请通过菜单导航。</p>
      </Card>
    </div>
  );
};

export default Notxtpage;
