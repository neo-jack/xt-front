import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { FC, useState } from 'react';
import { 
  setPassword, 
  hashPassword, 
  validatePasswordMatch,
  type SetPasswordResponse 
} from '@/services/user/setpassword';
import { TokenManager } from '@/models/usetoken';

interface ChangePasswordModalProps {
  open: boolean;
  onCancel: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // 检查用户是否已登录
      if (!TokenManager.hasTokens()) {
        message.error('用户未登录，请先登录');
        return;
      }
      
      const values = await form.validateFields();
      
      const { currentPassword, newPassword, confirmPassword } = values;
      
      // 前端密码验证
      if (!validatePasswordMatch(newPassword, confirmPassword)) {
        message.error('两次输入的密码不一致');
        return;
      }
      
      // 密码哈希处理
      const hashedOldPassword = hashPassword(currentPassword);
      const hashedNewPassword = hashPassword(newPassword);
      
      // 调用API
      const response: SetPasswordResponse = await setPassword({
        OLD_PWD: hashedOldPassword,
        NEW_PWD: hashedNewPassword,
      });
      
      // 处理响应
      if (response.code === 0) {
        message.success(response.msg || '密码修改成功');
        form.resetFields();
        onCancel();
      } else {
        message.error(response.msg || '密码修改失败');
      }
      
    } catch (error: any) {
      console.error('修改密码失败:', error);
      
      // 处理不同类型的错误
      if (error?.response?.status === 401) {
        message.error('用户未登录或登录已过期，请重新登录');
      } else if (error?.response?.status === 400) {
        message.error(error?.response?.data?.msg || '当前密码错误');
      } else if (error?.message) {
        message.error(error.message);
      } else {
        message.error('网络错误，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="修改密码"
      open={open}
      onCancel={onCancel}
      width={500}
      centered
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          取消
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          {loading ? '修改中...' : '确定修改'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ padding: '20px 0' }}
        autoComplete="off"
      >
        <Form.Item
          label="当前密码"
          name="currentPassword"
          rules={[
            { required: true, message: '请输入当前密码' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入当前密码"
          />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入新密码"
          />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请再次输入新密码"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
