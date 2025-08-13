import { Button, Form, Input, Modal, Switch } from 'antd';
import { FC } from 'react';

interface LockScreenModalProps {
  open: boolean;
  onCancel: () => void;
}

const LockScreenModal: FC<LockScreenModalProps> = ({ open, onCancel }) => {
  return (
    <Modal
      title="锁屏设置"
      open={open}
      onCancel={onCancel}
      width={500}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary">
          保存设置
        </Button>,
      ]}
    >
      <Form layout="vertical" style={{ padding: '20px 0' }}>
        <Form.Item label="启用自动锁屏">
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item label="锁屏时间（分钟）">
          <Input type="number" defaultValue="30" placeholder="请输入锁屏时间" />
        </Form.Item>
        <Form.Item label="锁屏密码">
          <Input.Password placeholder="请输入锁屏密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LockScreenModal;
