import { getGlobalSystemInfo } from '@/models/usesystem';
import { Button, Modal, QRCode } from 'antd';
import { FC, useMemo } from 'react';

interface QRCodeModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
  logoUrl?: string; // 添加logo地址配置
}

const QRCodeModal: FC<QRCodeModalProps> = ({ open, onCancel, userInfo, logoUrl }) => {
  const qrValue = useMemo(() => {
    const info = getGlobalSystemInfo();
    const domain = (info as any).servedomain || window.location.host;
    const protocol = window.location.protocol || 'https:';
    const base = domain.startsWith('http') ? domain : `${protocol}//${domain}`;
    const uid = userInfo?.USER_ID || '';
    // 生成可访问的链接，携带用户ID参数
    return `${base}/user?uid=${encodeURIComponent(uid)}`;
  }, [userInfo?.USER_ID]);

  // 默认logo地址，你可以替换为你的实际logo
  // 使用一个公开可用的logo，或者你可以替换为你自己的logo
  const defaultLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiMxODkwZmYiLz4KPHRleHQgeD0iMzAiIHk9IjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MT0dPPC90ZXh0Pgo8L3N2Zz4K';

  return (
    <Modal
      title="个人二维码"
      open={open}
      onCancel={onCancel}
      centered
      width={400}
      footer={false}
      closable={true}
      maskClosable={true}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px 0' 
      }}>
        <QRCode
          value={qrValue}
          size={200}
          style={{ marginBottom: 16 }}
          bgColor="#ffffff"
          fgColor="#000000"
          imageSettings={{
            src: logoUrl || defaultLogo,
            height: 60,
            width: 60,
            excavate: true
          }}
        />
        <p style={{ color: '#666', marginBottom: 8 }}>扫描二维码查看个人信息</p>
        <a href={qrValue} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all' }}>
          {qrValue}
        </a>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
