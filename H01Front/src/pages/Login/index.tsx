// 医疗平台登录页面
import { login, hashPasswordMD5 } from '@/services/user/login';
import { TokenManager } from '@/models/usetoken';

import { LockOutlined, UserOutlined, MedicineBoxOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography, Divider, Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const { Title, Text, Paragraph } = Typography;

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
    console.log('[Login Page] 开始登录流程');
    console.log('[Login Page] 用户名:', values.username);
    console.log('[Login Page] 原始密码长度:', values.password.length);
    setLoading(true);

    try {
      // 注意：login函数内部已经会进行MD5加密
      // 这里直接传入明文密码，由login函数负责加密
      console.log('[Login Page] 调用登录API');
      const response = await login(values);
      
      console.log('[Login Page] 原始响应对象:', response);
      console.log('[Login Page] 响应类型:', typeof response);
      console.log('[Login Page] 响应code:', response?.code);
      console.log('[Login Page] 响应data:', response?.data);
      console.log('[Login Page] 响应msg:', response?.msg);

      if (response && response.code === 0 && response.data) {
        console.log('[Login Page] ✅ 登录响应成功');
        console.log('[Login Page] 完整响应数据:', response.data);
        console.log('[Login Page] AccessToken存在:', !!response.data.AccessToken);
        console.log('[Login Page] AccessToken长度:', response.data.AccessToken ? response.data.AccessToken.length : 'undefined');
        console.log('[Login Page] RefreshToken存在:', !!response.data.RefreshToken);
        console.log('[Login Page] RefreshToken长度:', response.data.RefreshToken ? response.data.RefreshToken.length : 'undefined');
        console.log('[Login Page] ExpiresIn:', response.data.ExpiresIn);
        
        // 验证必要的字段是否存在
        if (!response.data.AccessToken || !response.data.RefreshToken) {
          console.error('[Login Page] ❌ 缺少必要的token字段');
          console.error('[Login Page] AccessToken:', response.data.AccessToken);
          console.error('[Login Page] RefreshToken:', response.data.RefreshToken);
          message.error('登录响应数据不完整');
          return;
        }
        
        // 登录成功，使用TokenManager保存令牌信息
        TokenManager.updateTokens(
          response.data.AccessToken,
          response.data.ExpiresIn || 3600,
          response.data.RefreshToken
        );

        // 保存用户信息到 localStorage
        localStorage.setItem('userInfo', JSON.stringify(response.data.USER));
        console.log('[Login Page] 用户信息已保存');

        message.success(response.msg || '登录成功！');
        console.log('[Login Page] 准备跳转到工作台');
        navigate('/xt/workboard');
      } else {
        console.log('[Login Page] ❌ 登录响应失败:', response);
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
    <div className={styles.medicalLoginContainer}>
      {/* 左侧医疗品牌区域 */}
      <div className={styles.leftPanel}>
        <div className={styles.brandSection}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <MedicineBoxOutlined className={styles.medicineIcon} />
            </div>
            <Title level={1} className={styles.brandTitle}>
              MediCare
            </Title>
            <Text className={styles.brandSubtitle}>
              智能医疗管理平台
            </Text>
          </div>
          
          <div className={styles.featureSection}>
            <div className={styles.featureItem}>
              <SafetyCertificateOutlined className={styles.featureIcon} />
              <div className={styles.featureContent}>
                <Text strong className={styles.featureTitle}>数据安全</Text>
                <Text className={styles.featureDesc}>采用银行级加密技术，保障患者隐私</Text>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <MedicineBoxOutlined className={styles.featureIcon} />
              <div className={styles.featureContent}>
                <Text strong className={styles.featureTitle}>智能诊断</Text>
                <Text className={styles.featureDesc}>AI辅助诊断，提高医疗效率</Text>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <SafetyCertificateOutlined className={styles.featureIcon} />
              <div className={styles.featureContent}>
                <Text strong className={styles.featureTitle}>质量控制</Text>
                <Text className={styles.featureDesc}>全流程质控，确保医疗质量</Text>
              </div>
            </div>
          </div>
          
          <div className={styles.bottomText}>
            <Text className={styles.copyright}>
              © 2024 MediCare Platform. All rights reserved.
            </Text>
          </div>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className={styles.rightPanel}>
        <div className={styles.loginSection}>
          <div className={styles.formHeader}>
            <Title level={2} className={styles.welcomeTitle}>
              欢迎回来
            </Title>
            <Text className={styles.welcomeSubtitle}>
              请登录您的账户以继续使用平台
            </Text>
          </div>

          <Form 
            name="login" 
            onFinish={onFinish} 
            autoComplete="off" 
            size="large"
            className={styles.loginForm}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名!' }]}
              className={styles.formItem}
            >
              <Input 
                prefix={<UserOutlined className={styles.inputIcon} />} 
                placeholder="请输入用户名" 
                className={styles.customInput}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码!' }]}
              className={styles.formItem}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="请输入密码"
                className={styles.customInput}
              />
            </Form.Item>

            <Form.Item className={styles.submitItem}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className={styles.loginButton}
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <Divider className={styles.divider}>
            <Text type="secondary">测试账号</Text>
          </Divider>

          <div className={styles.testAccount}>
            <Space direction="vertical" size="small" className={styles.accountInfo}>
              <div className={styles.accountRow}>
                <Text strong>用户名：</Text>
                <Text code>root</Text>
              </div>
              <div className={styles.accountRow}>
                <Text strong>密码：</Text>
                <Text code>root</Text>
              </div>
            </Space>
          </div>

          <div className={styles.helpSection}>
            <Text className={styles.helpText}>
              遇到问题？请联系系统管理员
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
