import { CameraOutlined, RotateLeftOutlined, RotateRightOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Slider, Upload, message } from 'antd';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

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
  const containerSize = 300;
  const handleSize = 8;
  const initialCropMargin = 20;
  const initialCrop = {
    x: initialCropMargin,
    y: initialCropMargin,
    w: containerSize - initialCropMargin * 2,
    h: containerSize - initialCropMargin * 2,
  };

  const [imageSrc, setImageSrc] = useState<string | undefined>(avatarSrc);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [imageOffset, setImageOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanningImage, setIsPanningImage] = useState(false);
  const panStartRef = useRef<{ x: number; y: number } | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number; w: number; h: number }>(
    { x: 0, y: 0, w: containerSize, h: containerSize },
  );
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const dragStartRef = useRef<{ mx: number; my: number; crop: { x: number; y: number; w: number; h: number } } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setImageSrc(avatarSrc);
    setScale(1);
    setRotation(0);
    setImageOffset({ x: 0, y: 0 });
    setCrop(initialCrop);
  }, [open, avatarSrc]);

  const onUploadBefore = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setScale(1);
      setRotation(0);
      setImageOffset({ x: 0, y: 0 });
      setCrop(initialCrop);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const onCropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // 当裁剪框充满容器时，拖拽裁剪框改为平移图片，满足“可拖动”体验
    if (crop.w >= containerSize && crop.h >= containerSize) {
      setIsPanningImage(true);
      panStartRef.current = { x: e.clientX - imageOffset.x, y: e.clientY - imageOffset.y };
      window.addEventListener('mousemove', onImageMouseMove);
      window.addEventListener('mouseup', onImageMouseUp);
      return;
    }
    setActiveHandle('move');
    dragStartRef.current = { mx: e.clientX, my: e.clientY, crop: { ...crop } };
    window.addEventListener('mousemove', onCropMouseMove);
    window.addEventListener('mouseup', onCropMouseUp);
  };

  const onHandleMouseDown = (handle: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setActiveHandle(handle);
    dragStartRef.current = { mx: e.clientX, my: e.clientY, crop: { ...crop } };
    window.addEventListener('mousemove', onCropMouseMove);
    window.addEventListener('mouseup', onCropMouseUp);
  };

  const onCropMouseMove = (e: MouseEvent) => {
    if (!dragStartRef.current || !activeHandle) return;
    const dx = e.clientX - dragStartRef.current.mx;
    const dy = e.clientY - dragStartRef.current.my;
    let { x, y, w, h } = dragStartRef.current.crop;
    const minSize = 40;

    if (activeHandle === 'move') {
      const nx = clamp(x + dx, 0, containerSize - w);
      const ny = clamp(y + dy, 0, containerSize - h);
      setCrop({ x: nx, y: ny, w, h });
      return;
    }

    // 保持裁剪框为正方形按比例缩放
    const resizeSquareFrom = (edge: string) => {
      let nw = w;
      let nh = h;
      let nx = x;
      let ny = y;

      if (edge === 'e') {
        nw = clamp(w + dx, minSize, containerSize - x);
        nh = nw;
        // 纵向居中
        ny = clamp(y - (nh - h) / 2, 0, containerSize - nh);
      } else if (edge === 's') {
        nh = clamp(h + dy, minSize, containerSize - y);
        nw = nh;
        nx = clamp(x - (nw - w) / 2, 0, containerSize - nw);
      } else if (edge === 'w') {
        nw = clamp(w - dx, minSize, x + w);
        nh = nw;
        nx = clamp(x + (w - nw), 0, containerSize - nw);
        ny = clamp(y - (nh - h) / 2, 0, containerSize - nh);
      } else if (edge === 'n') {
        nh = clamp(h - dy, minSize, y + h);
        nw = nh;
        ny = clamp(y + (h - nh), 0, containerSize - nh);
        nx = clamp(x - (nw - w) / 2, 0, containerSize - nw);
      } else if (edge === 'se') {
        // 取更大的变化，保持正方形
        const d = Math.max(dx, dy);
        nw = clamp(w + d, minSize, containerSize - x);
        nh = nw;
        ny = clamp(y - (nh - h) / 2, 0, containerSize - nh);
        nx = clamp(x - (nw - w) / 2, 0, containerSize - nw);
      } else if (edge === 'ne') {
        const d = Math.max(dx, -dy);
        nw = clamp(w + d, minSize, containerSize - x);
        nh = nw;
        ny = clamp(y - (nh - h), 0, containerSize - nh);
        nx = clamp(x - (nw - w) / 2, 0, containerSize - nw);
      } else if (edge === 'sw') {
        const d = Math.max(-dx, dy);
        nw = clamp(w + d, minSize, x + w);
        nh = nw;
        nx = clamp(x + (w - nw), 0, containerSize - nw);
        ny = clamp(y - (nh - h) / 2, 0, containerSize - nh);
      } else if (edge === 'nw') {
        const d = Math.max(-dx, -dy);
        nw = clamp(w + d, minSize, x + w);
        nh = nw;
        nx = clamp(x + (w - nw), 0, containerSize - nw);
        ny = clamp(y + (h - nh), 0, containerSize - nh);
      }

      // 边界修正，确保在容器内
      nx = clamp(nx, 0, containerSize - nw);
      ny = clamp(ny, 0, containerSize - nh);
      setCrop({ x: nx, y: ny, w: nw, h: nh });
    };

    if (['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'].includes(activeHandle)) {
      resizeSquareFrom(activeHandle);
    }
  };

  const onCropMouseUp = () => {
    setActiveHandle(null);
    dragStartRef.current = null;
    window.removeEventListener('mousemove', onCropMouseMove);
    window.removeEventListener('mouseup', onCropMouseUp);
  };

  const onImageMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageSrc) return;
    e.stopPropagation();
    setIsPanningImage(true);
    panStartRef.current = { x: e.clientX - imageOffset.x, y: e.clientY - imageOffset.y };
    window.addEventListener('mousemove', onImageMouseMove);
    window.addEventListener('mouseup', onImageMouseUp);
  };

  const onImageMouseMove = (e: MouseEvent) => {
    if (!isPanningImage || !panStartRef.current) return;
    const nx = e.clientX - panStartRef.current.x;
    const ny = e.clientY - panStartRef.current.y;
    setImageOffset({ x: nx, y: ny });
  };

  const onImageMouseUp = () => {
    setIsPanningImage(false);
    panStartRef.current = null;
    window.removeEventListener('mousemove', onImageMouseMove);
    window.removeEventListener('mouseup', onImageMouseUp);
  };

  const renderHandles = () => (
    <>
      {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((pos) => {
        const style: React.CSSProperties = { position: 'absolute', width: handleSize, height: handleSize, background: '#007bff', cursor: `${pos}-resize` };
        const half = handleSize / 2;
        if (pos.includes('n')) style.top = -half;
        if (pos.includes('s')) style.bottom = -half;
        if (pos.includes('w')) style.left = -half;
        if (pos.includes('e')) style.right = -half;
        if (pos === 'n') style.left = `calc(50% - ${half}px)`;
        if (pos === 's') style.left = `calc(50% - ${half}px)`;
        if (pos === 'w') style.top = `calc(50% - ${half}px)`;
        if (pos === 'e') style.top = `calc(50% - ${half}px)`;
        return <div key={pos} style={style} onMouseDown={onHandleMouseDown(pos)} />;
      })}
    </>
  );

  const exportCroppedImage = async (): Promise<string | null> => {
    if (!imageSrc) return null;
    const img = imgRef.current;
    if (!img) return null;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(crop.w);
    canvas.height = Math.round(crop.h);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.save();

    const centerX = crop.w / 2;
    const centerY = crop.h / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    const sourceX = (crop.x - (containerSize / 2 - imageOffset.x)) / 1;
    const sourceY = (crop.y - (containerSize / 2 - imageOffset.y)) / 1;

    const drawX = -(containerSize / 2 - sourceX);
    const drawY = -(containerSize / 2 - sourceY);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const displayScale = Math.min(containerSize / imgW, containerSize / imgH);

    ctx.drawImage(
      img,
      drawX / displayScale,
      drawY / displayScale,
      containerSize / displayScale,
      containerSize / displayScale,
    );

    ctx.restore();
    return canvas.toDataURL('image/png');
  };

  const handleConfirm = async () => {
    const dataUrl = await exportCroppedImage();
    if (!dataUrl) {
      message.error('请先选择一张图片');
      return;
    }
    if (onOk) onOk(dataUrl);
  };

  return (
    <Modal
      title="上传头像"
      open={open}
      onCancel={onCancel}
      centered
      width={720}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm}>
          确定
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Upload accept="image/*" showUploadList={false} beforeUpload={onUploadBefore}>
              <Button type="primary" icon={<CameraOutlined />}>上传照片</Button>
            </Upload>
            <div style={{ width: 180 }}>
              <Slider min={0.5} max={2} step={0.01} value={scale} onChange={(v) => setScale(v as number)} />
            </div>
            <Button icon={<RotateLeftOutlined />} onClick={() => setRotation((r) => (r + 270) % 360)} />
            <Button icon={<RotateRightOutlined />} onClick={() => setRotation((r) => (r + 90) % 360)} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#999' }}>使用过的头像</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div
            ref={containerRef}
            style={{
              width: containerSize,
              height: containerSize,
              border: '1px solid #e5e5e5',
              background: '#fff',
              position: 'relative',
              overflow: 'hidden',
              userSelect: 'none',
            }}
            onMouseDown={onImageMouseDown}
          >
            {/* 底板层 */}
            <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />

            {/* 图片层：当鼠标指在裁剪框外时通过容器 onMouseDown 拖动图片 */}
            {imageSrc ? (
              <img
                ref={imgRef}
                src={imageSrc}
                alt="avatar"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${imageOffset.x}px, ${imageOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
                  transformOrigin: 'center center',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                <UserOutlined style={{ fontSize: 200 }} />
              </div>
            )}

            <div
              onMouseDown={onCropMouseDown}
              style={{
                position: 'absolute',
                left: crop.x,
                top: crop.y,
                width: crop.w,
                height: crop.h,
                border: '1px solid #007bff',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.35) inset',
                cursor: activeHandle && activeHandle !== 'move' ? `${activeHandle}-resize` : 'move',
                zIndex: 3,
                touchAction: 'none',
              }}
            >
              {renderHandles()}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>使用过的头像</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {/* 历史头像列表占位，可按需接入 */}
              <Avatar src={avatarSrc} icon={<UserOutlined />} size={60} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeAvatarModal;
