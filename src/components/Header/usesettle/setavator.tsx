import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Modal, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FC, useState } from 'react';

interface ChangeAvatarModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
  avatarSrc?: string;
  onOk?: (dataUrl: string) => void;
}

const ChangeAvatarModal: FC<ChangeAvatarModalProps> = ({
  open,
  onCancel,
  userInfo,
  avatarSrc,
  onOk,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(avatarSrc);

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(info.file.originFileObj);
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const handleConfirm = () => {
    if (!imageSrc) {
      message.warning('请先选择一张图片');
      return;
    }
    if (onOk) onOk(imageSrc);
  };

  return (
    <Modal
      title="上传头像"
      open={open}
      onCancel={onCancel}
      centered
      width={720}
      footer={[
        <Button key="submit" type="primary" onClick={handleConfirm}>
          确定
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ImgCrop
              rotationSlider
              quality={1}
              showReset
              modalTitle="裁剪头像"
              modalWidth={600}
              modalOk="确定"
              modalCancel="取消"
              aspect={1}
              minZoom={0.5}
              maxZoom={3}
              fillColor="transparent"
            >
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUpload}
              >
                <Button type="primary" icon={<CameraOutlined />}>
                  上传照片
                </Button>
              </Upload>
            </ImgCrop>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div
            style={{
              width: 300,
              height: 300,
              border: '1px solid #e5e5e5',
              background: '#fff',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="avatar"
                width={280}
                height={280}
                style={{
                  objectFit: 'cover',
                }}
                preview={{
                  mask: '点击预览',
                  maskClassName: 'custom-mask',
                }}
              />
            ) : (
              <div style={{ color: '#ccc' }}>
                <UserOutlined style={{ fontSize: 200 }} />
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>使用过的头像</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Avatar 
                src={avatarSrc} 
                icon={<UserOutlined />} 
                size={60}
                style={{ cursor: 'pointer' }}
                onClick={() => avatarSrc && setImageSrc(avatarSrc)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeAvatarModal;
