// 登录页面
import { login } from '@/services/login/LoginController';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

interface LoginForm {
  username: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 检查是否已登录，如果已登录则重定向到首页
  useEffect(() => {
    // 检查是否已登录，如果已登录则重定向到首页 使用withAuthorization
  }, [navigate]);

  const onFinish = async (values: LoginForm) => {
    console.log('登录信息:', values);
    setLoading(true);

    try {
      // 调用后端登录API
      const response = await login(values);

      if (response.code === 0 && response.data) {
        // 登录成功，保存AccessToken、RefreshToken和过期时间
        localStorage.setItem('accessToken', response.data.AccessToken);
        localStorage.setItem('refreshToken', response.data.RefreshToken);

        // 计算过期时间戳（当前时间 + ExpiresIn秒）
        const expireTime = Date.now() + response.data.ExpiresIn * 1000;
        localStorage.setItem('tokenExpireTime', expireTime.toString());

        // 保存用户信息到 localStorage
        localStorage.setItem('userInfo', JSON.stringify(response.data.USER));

        message.success(response.msg || '登录成功！');
        navigate('/xt/workboard');
      } else {
        message.error(response.msg || '登录失败！');
      }
    } catch (error: any) {
      console.error('登录错误:', error);
      message.error(error.message || '网络错误，请稍后重试！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card title="用户登录" className={styles.loginCard}>
        <Form name="login" onFinish={onFinish} autoComplete="off" size="large">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名 (admin)" />
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
            <Button type="primary" htmlType="submit" block loading={loading}>
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
