import useSystem from '@/models/usesystem';
import { LinkOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC, useMemo } from 'react';

interface LinkInfoProps {
  style?: React.CSSProperties;
}

const LinkInfo: FC<LinkInfoProps> = ({ style }) => {
  const { systemInfo } = useSystem();
  const serverDomain = useMemo(() => {
    // 优先使用系统信息中的服务器域名，缺省回退到当前站点域名
    return (systemInfo as any).servedomain || window.location.host;
  }, [systemInfo]);

  return (
    <Space
      size={6}
      style={{ alignItems: 'center', color: '#000', ...style }}
    >
      <LinkOutlined />
      <span style={{ fontSize: 14 }}>{serverDomain}</span>
    </Space>
  );
};

export default LinkInfo;


