import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { FC } from 'react';

interface ChangePasswordModalProps {
  open: boolean;
  onCancel: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('修改密码:', values);
      // 这里添加修改密码的API调用
      message.success('密码修改成功');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="修改密码"
      open={open}
      onCancel={onCancel}
      width={500}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确定修改
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
            { min: 6, message: '密码长度至少6位' },
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
            { min: 6, message: '密码长度至少6位' },
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)/,
              message: '密码必须包含字母和数字',
            },
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
