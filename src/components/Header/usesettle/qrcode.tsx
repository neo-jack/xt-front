import { getGlobalSystemInfo } from '@/models/usesystem';
import { Button, Modal, QRCode } from 'antd';
import { FC, useMemo } from 'react';

interface QRCodeModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ open, onCancel, userInfo }) => {
  const qrValue = useMemo(() => {
    const info = getGlobalSystemInfo();
    const domain = (info as any).servedomain || window.location.host;
    const protocol = window.location.protocol || 'https:';
    const base = domain.startsWith('http') ? domain : `${protocol}//${domain}`;
    const uid = userInfo?.USER_ID || '';
    // 生成可访问的链接，携带用户ID参数
    return `${base}/user?uid=${encodeURIComponent(uid)}`;
  }, [userInfo?.USER_ID]);

  return (
    <Modal
      title="个人二维码"
      open={open}
      onCancel={onCancel}
      centered
      width={400}
      footer={[
        <Button key="close" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <QRCode
          value={qrValue}
          size={200}
          style={{ marginBottom: 16 }}
        />
        <p style={{ color: '#666', marginBottom: 8 }}>扫描二维码打开链接</p>
        <a href={qrValue} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all' }}>
          {qrValue}
        </a>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
