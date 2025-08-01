import { Card } from 'antd';
import { FC } from 'react';

const WorkBoard: FC = () => {
  return (
    <div>
      <Card title="工作看板" bordered={false}>
        <p>工作看板页面内容</p>
      </Card>
    </div>
  );
};

export default WorkBoard;
