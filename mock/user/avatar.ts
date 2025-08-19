//-----------------------------------------------
// 头像获取后端
// 
//-----------------------------------------------




import fs from 'fs';
import path from 'path';

// Mock 头像请求接口类型定义
interface MockAvatarRequest {
  params: {
    filename: string; // 头像文件名
  };
}

// Mock 响应接口类型定义
interface MockAvatarResponse {
  setHeader: (key: string, value: string) => void;
  status: (code: number) => MockAvatarResponse;
  sendFile: (path: string) => void;
  end: (data?: string) => void;
}

// 头像文件存储目录（相对于项目根目录）
const AVATAR_DIR = path.join(process.cwd(), 'mock/datebash/acators');

// 确保头像目录存在
const ensureAvatarDir = () => {
  if (!fs.existsSync(AVATAR_DIR)) {
    fs.mkdirSync(AVATAR_DIR, { recursive: true });
    console.log(`Created avatar directory: ${AVATAR_DIR}`);
  }
};

// 根据文件扩展名获取MIME类型
const getMimeType = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/png';
  }
};

// 实现基于文件系统的头像mock
export default {
  'GET /datebash/acators/:filename': (
    req: MockAvatarRequest,
    res: MockAvatarResponse,
  ) => {
    const { filename } = req.params;

    console.log(`Mock: 请求头像文件 ${filename}`);

    // 确保头像目录存在
    ensureAvatarDir();

    // 构建文件路径
    const filePath = path.join(AVATAR_DIR, filename);

    try {
      // 检查文件是否存在
      if (fs.existsSync(filePath)) {
        // 设置响应头
        const mimeType = getMimeType(filename);
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 缓存1年
        res.setHeader('Access-Control-Allow-Origin', '*');

        // 发送文件
        res.sendFile(filePath);

        console.log(`Mock: 成功返回头像文件 ${filename}`);
      } else {
        // 文件不存在，返回默认头像或404
        console.log(`Mock: 头像文件不存在 ${filename}`);

        // 返回默认头像路径
        const defaultAvatarPath = path.join(AVATAR_DIR, 'default.png');
        if (fs.existsSync(defaultAvatarPath)) {
          res.setHeader('Content-Type', 'image/png');
          res.sendFile(defaultAvatarPath);
        } else {
          res.status(404).end('Avatar not found');
        }
      }
    } catch (error) {
      console.error('Mock avatar file error:', error);
      res.status(500).end('Internal server error');
    }
  },
};

// 工具函数：创建示例头像文件
export const createSampleAvatars = () => {
  ensureAvatarDir();

  // 创建一个简单的SVG默认头像
  const defaultSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="#f0f0f0"/>
  <circle cx="32" cy="24" r="8" fill="#bbbbbb"/>
  <ellipse cx="32" cy="48" rx="12" ry="8" fill="#bbbbbb"/>
</svg>`;

  const defaultPath = path.join(AVATAR_DIR, 'default.svg');
  if (!fs.existsSync(defaultPath)) {
    fs.writeFileSync(defaultPath, defaultSvg);
    console.log('Created default avatar: default.svg');
  }
};

// 工具函数：获取头像目录中的所有文件
export const getAvatarFiles = (): string[] => {
  ensureAvatarDir();
  
  try {
    const files = fs.readdirSync(AVATAR_DIR);
    return files.filter(file => {
      const ext = file.split('.').pop()?.toLowerCase();
      return ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext || '');
    });
  } catch (error) {
    console.error('获取头像文件列表失败:', error);
    return [];
  }
};
