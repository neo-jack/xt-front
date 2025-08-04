import { PageContainer } from '@ant-design/pro-components';

import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除登录信息
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    message.success('退出登录成功！');
    navigate('/login');
  };

  // 获取用户信息
  const userInfo = localStorage.getItem('userInfo');
  const user = userInfo ? JSON.parse(userInfo) : null;

  return (
    <PageContainer
      ghost
      extra={[
        <Button key="logout" onClick={handleLogout}>
          退出登录
        </Button>,
      ]}
    >
      <div className={styles.container}>
        {user && (
          <div
            style={{
              marginBottom: 20,
              padding: 16,
              background: '#f6f8fa',
              borderRadius: 8,
            }}
          >
            <h3>欢迎回来，{user.name}！</h3>
            <p>当前用户权限路由：{user.routes?.join(', ')}</p>
            <p>按钮权限：{user.buttons?.join(', ')}</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default HomePage;
