import React, { FC, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useLockScreen from '../../../models/uselockscreen';

interface LockStartProps {
  /** 按钮类型，默认为 'text' */
  type?: 'primary' | 'default' | 'text' | 'link';
  /** 按钮大小 */
  size?: 'small' | 'middle' | 'large';
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 锁屏启动组件
 * 提供立即锁屏功能的按钮
 */
const LockStart: FC<LockStartProps> = ({
  type = 'text',
  size = 'middle',
  showIcon = true,
  style,
  onClick,
}) => {
  const { config, lock } = useLockScreen();
  const [loading, setLoading] = useState(false);

  /**
   * 处理锁屏启动
   */
  const handleLockStart = async () => {
    // 检查锁屏功能是否启用
    if (!config.isEnabled) {
      Modal.warning({
        title: '提示',
        content: '锁屏功能未启用，请先在设置中启用锁屏功能并设置密码。',
        icon: <ExclamationCircleOutlined />,
      });
      return;
    }

    // 检查是否设置了密码
    if (!config.password) {
      Modal.warning({
        title: '提示',
        content: '请先设置锁屏密码后再使用锁屏功能。',
        icon: <ExclamationCircleOutlined />,
      });
      return;
    }

    // 确认对话框
    Modal.confirm({
      title: '确认锁屏',
      content: '确定要立即锁定屏幕吗？锁定后需要输入密码才能解锁。',
      icon: <LockOutlined />,
      okText: '确定锁屏',
      cancelText: '取消',
      onOk: async () => {
        setLoading(true);
        
        try {
          const result = lock('manual');
          
          if (result.success) {
            message.success(result.message || '屏幕已锁定');
            onClick?.();
          } else {
            message.error(result.message || '锁屏失败');
          }
        } catch (error) {
          console.error('锁屏操作失败:', error);
          message.error('锁屏操作失败，请稍后重试');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Button
      type={type}
      size={size}
      icon={showIcon ? <LockOutlined /> : undefined}
      loading={loading}
      onClick={handleLockStart}
      style={style}
    >
      立即锁屏
    </Button>
  );
};

export default LockStart;
