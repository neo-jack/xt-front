import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Upload } from 'antd';
import { FC } from 'react';

interface ChangeAvatarModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
  avatarSrc?: string;
}

const ChangeAvatarModal: FC<ChangeAvatarModalProps> = ({
  open,
  onCancel,
  userInfo,
  avatarSrc,
}) => {
  return (
    <Modal
      title="修改头像"
      open={open}
      onCancel={onCancel}
      width={500}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary">
          确定
        </Button>,
      ]}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Avatar
          src={avatarSrc}
          icon={<UserOutlined />}
          size={100}
          style={{ marginBottom: 20 }}
        />
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            // 这里可以添加上传逻辑
            console.log('上传文件:', file);
            return false; // 阻止自动上传
          }}
        >
          <Button icon={<CameraOutlined />}>选择头像</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default ChangeAvatarModal;
