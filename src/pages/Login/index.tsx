// 登录页面
import { FC } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

interface LoginForm {
  username: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    console.log('登录信息:', values);
    
    // 模拟登录逻辑
    if (values.username === 'admin' && values.password === '123456') {
      // 登录成功，保存token和用户信息
      localStorage.setItem('token', 'mock-token-12345');
      localStorage.setItem('userInfo', JSON.stringify({
        name: '管理员',
        avatar: 'https://example.com/avatar.jpg',
        routes: ['/home', '/access', '/table'],
        buttons: ['add', 'edit', 'delete']
      }));
      
      message.success('登录成功！');
      navigate('/home');
    } else {
      message.error('用户名或密码错误！');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card title="用户登录" className={styles.loginCard}>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名 (admin)" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码 (123456)"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        
        <div className={styles.tips}>
          <p>测试账号：admin</p>
          <p>测试密码：123456</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;