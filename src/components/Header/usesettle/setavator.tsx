import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Modal, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FC, useState, useEffect } from 'react';
import { getHeadshotList } from '@/services';
import type { HeadshotInfo } from '@/services';

interface ChangeAvatarModalProps {
  //设置组件是否打开
  open: boolean;
  //设置组件取消
  onCancel: () => void;
  //头像
  avatarSrc?: string;
  //上传头像成功回调
  onOk?: (dataUrl: string) => void;
  //用户ID
  userId: string;
}

const ChangeAvatarModal: FC<ChangeAvatarModalProps> = ({
  open,
  onCancel,
  avatarSrc,
  onOk,
  userId,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(avatarSrc);
  const [headshotList, setHeadshotList] = useState<HeadshotInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // 调用获取用户头像列表
  const fetchHeadshotList = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await getHeadshotList({ id: userId });
      
      if (response.code === 200) {
        // 过滤掉id为1的头像（当前头像），避免重复显示
        const filteredList = response.data.filter((headshot: HeadshotInfo) => headshot.id !== 1);
        setHeadshotList(filteredList);
      } else {
        message.error(response.msg || '获取头像列表失败');
      }
    } catch (error) {
      message.error('获取头像列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && userId) {
      fetchHeadshotList();
    }
  }, [open, userId]);

  const handleUpload = (info: any) => {
    const file = info.file.originFileObj || info.file;
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      message.success(`${file.name} 选择成功`);
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
                preview={false}
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
              {/* 当前头像 */}
              {avatarSrc && (
                <Avatar 
                  src={avatarSrc} 
                  icon={<UserOutlined />} 
                  size={60}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setImageSrc(avatarSrc)}
                />
              )}
              
              {/* 头像列表 */}
              {headshotList.map((headshot) => (
                <Avatar
                  key={headshot.id}
                  src={headshot.url}
                  icon={<UserOutlined />}
                  size={60}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setImageSrc(headshot.url)}
                />
              ))}
              
              {/* 加载状态 */}
              {loading && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: 12, 
                  color: '#999' 
                }}>
                  加载中...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeAvatarModal;
