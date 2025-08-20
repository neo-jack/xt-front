import { Button, Modal, QRCode, Spin, Alert } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { getDemandUrl } from '@/services/user/getdemandurl';

interface QRCodeModalProps {
  open: boolean;
  onCancel: () => void;
  userInfo?: any;
  logoUrl?: string;
}

// 请求状态枚举
enum RequestStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  TIMEOUT = 'timeout'
}

const QRCodeModal: FC<QRCodeModalProps> = ({ open, onCancel, userInfo, logoUrl }) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.LOADING);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  
  // 防抖定时器引用
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // 请求超时定时器引用
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 默认logo地址
  const defaultLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiMxODkwZmYiLz4KPHRleHQgeD0iMzAiIHk9IjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MT0dPPC90ZXh0Pgo8L3N2Zz4K';

  // 请求二维码URL的函数
  const fetchQRCodeUrl = useCallback(async () => {
    console.log('[QRCode Modal] 开始请求二维码URL');
    setRequestStatus(RequestStatus.LOADING);
    setErrorMessage('');

    try {
      // 设置请求超时定时器（10秒）
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutTimerRef.current = setTimeout(() => {
          reject(new Error('请求超时'));
        }, 10000);
      });

      // 发起API请求
      const requestPromise = getDemandUrl();

      // 使用Promise.race来实现超时控制
      const response = await Promise.race([requestPromise, timeoutPromise]);

      // 清除超时定时器
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }

      console.log('[QRCode Modal] 二维码URL请求响应:', response);

      if (response.code === 0) {
        // 请求成功
        const url = response.data?.[0]?.url;
        if (url) {
          setQrCodeUrl(url);
          setRequestStatus(RequestStatus.SUCCESS);
          console.log('[QRCode Modal] 二维码URL获取成功:', url);
        } else {
          setErrorMessage('二维码URL数据格式错误');
          setRequestStatus(RequestStatus.ERROR);
        }
      } else if (response.code === -1) {
        // 请求失败
        setErrorMessage(response.msg || '获取二维码失败');
        setRequestStatus(RequestStatus.ERROR);
      } else {
        // 其他错误状态
        setErrorMessage(`请求失败: ${response.msg || '未知错误'}`);
        setRequestStatus(RequestStatus.ERROR);
      }
    } catch (error: any) {
      console.error('[QRCode Modal] 二维码URL请求失败:', error);
      
      // 清除超时定时器
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }

      if (error.message === '请求超时') {
        setErrorMessage('请求超时，请检查网络连接');
        setRequestStatus(RequestStatus.TIMEOUT);
      } else {
        setErrorMessage('网络错误，请稍后重试');
        setRequestStatus(RequestStatus.ERROR);
      }
    }
  }, []);

  // 带防抖的重试函数
  const handleRetry = useCallback(() => {
    console.log('[QRCode Modal] 用户触发重试');
    
    // 清除之前的防抖定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 设置重试状态
    setIsRetrying(true);

    // 设置防抖定时器（1秒）
    debounceTimerRef.current = setTimeout(() => {
      setIsRetrying(false);
      fetchQRCodeUrl();
    }, 1000);
  }, [fetchQRCodeUrl]);

  // Modal打开时自动请求二维码URL
  useEffect(() => {
    if (open) {
      console.log('[QRCode Modal] Modal打开，开始请求二维码URL');
      fetchQRCodeUrl();
    } else {
      // Modal关闭时重置状态
      setRequestStatus(RequestStatus.LOADING);
      setQrCodeUrl('');
      setErrorMessage('');
      setIsRetrying(false);
      
      // 清除所有定时器
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }
    }
  }, [open, fetchQRCodeUrl]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
    };
  }, []);

  // 渲染内容的函数
  const renderContent = () => {
    switch (requestStatus) {
      case RequestStatus.LOADING:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '60px 0' 
          }}>
            <Spin 
              indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />}
              size="large"
            />
            <p style={{ color: '#666', marginTop: 16, fontSize: 16 }}>
              {isRetrying ? '正在重新获取...' : '正在获取二维码...'}
            </p>
          </div>
        );

      case RequestStatus.SUCCESS:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px 0' 
          }}>
            <QRCode
              value={qrCodeUrl}
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
            <p style={{ color: '#666', marginBottom: 8 }}>扫描二维码查看相关信息</p>
          </div>
        );

      case RequestStatus.ERROR:
      case RequestStatus.TIMEOUT:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '40px 20px' 
          }}>
            <Alert
              message="获取二维码失败"
              description={errorMessage}
              type="error"
              showIcon
              style={{ marginBottom: 20, width: '100%' }}
            />
            <Button 
              type="primary" 
              icon={<ReloadOutlined />}
              onClick={handleRetry}
              loading={isRetrying}
              disabled={isRetrying}
            >
              {isRetrying ? '重新获取中...' : '重新获取'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

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
      {renderContent()}
    </Modal>
  );
};

export default QRCodeModal;
