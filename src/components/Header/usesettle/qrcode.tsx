import { Button, Modal, QRCode } from 'antd';
import { FC } from 'react';

interface QRCodeModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ open, onCancel, userInfo }) => {
  return (
    <Modal
      title="个人二维码"
      open={open}
      onCancel={onCancel}
      width={400}
      footer={[
        <Button key="close" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <QRCode
          value={userInfo?.USER_ID || 'user-id'}
          size={200}
          style={{ marginBottom: 16 }}
        />
        <p style={{ color: '#666' }}>扫描二维码查看个人信息</p>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
