import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from '@umijs/max';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/xt/home');
  };

  const handleBackLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f0f2f5'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={[
          <Button type="primary" key="home" onClick={handleBackHome}>
            返回首页
          </Button>,
          <Button key="login" onClick={handleBackLogin}>
            返回登录
          </Button>,
        ]}
      />
    </div>
  );
};

export default NotFound;
