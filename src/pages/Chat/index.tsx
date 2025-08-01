import { Card } from 'antd';
import { FC } from 'react';

const Chat: FC = () => {
  return (
    <div>
      <Card title="聊天" bordered={false}>
        <p>聊天页面内容</p>
      </Card>
    </div>
  );
};

export default Chat;
