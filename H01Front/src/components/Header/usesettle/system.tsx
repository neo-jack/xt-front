import { getGlobalSystemInfo } from '@/models/usesystem';
import { Button, Descriptions, Modal } from 'antd';
import { FC } from 'react';

interface SystemInfoModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
}

const SystemInfoModal: FC<SystemInfoModalProps> = ({
  open,
  onCancel,
  userInfo,
}) => {
  return (
    <Modal
      title="关于系统"
      open={open}
      onCancel={onCancel}
      centered
      width={600}
      footer={[
        <Button key="close" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Descriptions column={1} bordered style={{ marginTop: 16 }}>
        <Descriptions.Item label="系统版本">
          {getGlobalSystemInfo().version || '未知版本'}
        </Descriptions.Item>
        <Descriptions.Item label="主版本号">
          {getGlobalSystemInfo().major || 0}
        </Descriptions.Item>
        <Descriptions.Item label="客户端IP">
          {getGlobalSystemInfo().clientip || '未知'}
        </Descriptions.Item>
        <Descriptions.Item label="服务器域名">
          {getGlobalSystemInfo().servedomain || '未知'}
        </Descriptions.Item>
        <Descriptions.Item label="用户信息">
          {userInfo?.USER_NAME || '未登录用户'}
        </Descriptions.Item>
        <Descriptions.Item label="医院信息">
          {userInfo?.HOSPITAL_CNAME || '未知医院'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default SystemInfoModal;
