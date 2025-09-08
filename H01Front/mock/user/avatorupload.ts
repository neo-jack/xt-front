// 请求 post请求 /api/user/avatorupload

import fs from 'fs';
import path from 'path';
import { mockUsers } from '../../../Datebash/users';
import { mockHeadshots, HeadshotInfo } from '../../../Datebash/acators';
import { parseTokenUserId } from '../utils/tokenid';

// Mock 头像上传请求接口类型定义
interface MockAvatarUploadRequest {
    headers: {
        authorization?: string; // Bearer token
    };
    body: {
        //头像数据 (base64格式)
        avatar: string;
    };
}

//Mock 响应接口类型定义
interface MockAvatarUploadResponse {
    code: number;
    data: {
        //上传成功后的头像URL
        url: string;
        //头像ID
        id: number;
        //消息
        message: string;
        //上传者用户ID
        userId: number;
    };
    msg: string;
}

// 头像文件存储目录（如果服务在Front目录运行，需要回到上级目录）
const AVATAR_DIR = path.join(process.cwd(), '../Datebash/acators');

// 确保头像目录存在
const ensureAvatarDir = () => {
    if (!fs.existsSync(AVATAR_DIR)) {
        fs.mkdirSync(AVATAR_DIR, { recursive: true });
        console.log(`Created avatar directory: ${AVATAR_DIR}`);
    }
};

// 从base64数据URL中提取图片数据和格式
const parseBase64Image = (dataUrl: string) => {
    const matches = dataUrl.match(/^data:image\/([a-zA-Z]*);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image data');
    }
    
    return {
        type: matches[1], // 图片格式 (png, jpeg, etc.)
        data: matches[2]  // base64数据
    };
};

// 生成唯一的文件名
const generateFileName = (userId: string, imageType: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return `user_${userId}_${timestamp}_${random}.${imageType}`;
};

// 更新头像列表的函数
const updateAvatarList = (fileName: string, userId: string): void => {
    try {
        // 生成新的头像ID（取当前列表最大ID + 1）
        const maxId = mockHeadshots.length > 0 ? Math.max(...mockHeadshots.map(h => h.id)) : 0;
        const newId = maxId + 1;

        // 创建新的头像信息
        const newHeadshot: HeadshotInfo = {
            id: newId,
            name: fileName,
            url: `/datebash/acators/${fileName}`,
            userId: parseInt(userId)
        };

        // 添加到头像列表
        mockHeadshots.push(newHeadshot);

        console.log(`Mock: 已将新头像添加到列表 - ID: ${newId}, 文件名: ${fileName}`);
        
        // 可选：将更新的列表写入文件（如果需要持久化）
        const indexFilePath = path.join(process.cwd(), '../Datebash/acators/index.ts');
        const updatedContent = `// 头像信息接口
export interface HeadshotInfo {
    name: string;
    url: string;
    id: number;
    userId: number;
}

// 可用的头像列表数据
export const mockHeadshots: HeadshotInfo[] = ${JSON.stringify(mockHeadshots, null, 4).replace(/"([^"]+)":/g, '$1:')};
`;
        fs.writeFileSync(indexFilePath, updatedContent, 'utf8');
        console.log(`Mock: 已更新头像列表文件 ${indexFilePath}`);
        
    } catch (error) {
        console.error('Mock: 更新头像列表失败:', error);
    }
};

// 更新用户信息的函数
const updateUserList = (userId: string, avatarUrl: string): void => {
    try {
        // 更新对应用户的头像信息
        const user = mockUsers.find(u => u.USER_ID.toString() === userId);
        if (user) {
            user.USER_AVATAR = avatarUrl;
            console.log(`Mock: 已更新用户 ${userId} 的头像为 ${avatarUrl}`);
            
            // 将更新的用户数据写入文件
            const userFilePath = path.join(process.cwd(), '../Datebash/users/index.ts');
            const updatedUserContent = `// 用户数据定义
export interface MockUser {
  USER_ID: number;
  USER_NAME: string;
  USER_AVATAR: string;
  USER_ROLE: string;
  HOSPITAL_CNAME: string;
  HOSPITAL_ID: number;
  username: string;
  password: string;
}

// 模拟用户数据
export const mockUsers: MockUser[] = ${JSON.stringify(mockUsers, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
            fs.writeFileSync(userFilePath, updatedUserContent, 'utf8');
            console.log(`Mock: 已更新用户列表文件 ${userFilePath}`);
        } else {
            console.warn(`Mock: 未找到用户ID为 ${userId} 的用户`);
        }
        
    } catch (error) {
        console.error('Mock: 更新用户信息失败:', error);
    }
};

// 实现头像上传的mock API
export default {
    'POST /api/user/avatorupload': (
        req: MockAvatarUploadRequest,
        res: any
    ) => {
        const { avatar } = req.body;
        const authHeader = req.headers.authorization;
        
        console.log(`Mock: 收到头像上传请求`);

        try {
            // 从token解析用户ID
            const userId = parseTokenUserId(authHeader || '');
            
            if (!userId) {
                const errorResponse: MockAvatarUploadResponse = {
                    code: 401,
                    data: {
                        url: '',
                        id: 0,
                        message: '无效的token或用户ID',
                        userId: 0
                    },
                    msg: '认证失败'
                };
                return res.status(401).json(errorResponse);
            }

            console.log(`Mock: 用户 ${userId} 上传头像`);

            if (!avatar) {
                const errorResponse: MockAvatarUploadResponse = {
                    code: 400,
                    data: {
                        url: '',
                        id: 0,
                        message: '头像数据不能为空',
                        userId: 0
                    },
                    msg: '参数错误'
                };
                return res.status(400).json(errorResponse);
            }

            // 确保头像目录存在
            ensureAvatarDir();

            // 解析base64图片数据
            const { type, data } = parseBase64Image(avatar);
            
            // 生成文件名
            const fileName = generateFileName(userId.toString(), type);
            const filePath = path.join(AVATAR_DIR, fileName);
            
            // 将base64数据写入文件
            const buffer = Buffer.from(data, 'base64');
            fs.writeFileSync(filePath, buffer);
            
            console.log(`Mock: 头像保存成功 ${fileName}`);

            // 生成访问URL
            const avatarUrl = `/datebash/acators/${fileName}`;
            
            // 生成新的头像ID（这里简单使用时间戳）
            const avatarId = Date.now();

            // 更新用户头像信息并持久化到文件
            updateUserList(userId.toString(), avatarUrl);

            // 将新头像添加到头像列表中
            updateAvatarList(fileName, userId.toString());

            const response: MockAvatarUploadResponse = {
                code: 0,
                data: {
                    url: avatarUrl,
                    id: avatarId,
                    message: '头像上传成功',
                    userId: userId
                },
                msg: '上传成功'
            };

            console.log(`Mock: 头像上传成功，URL: ${avatarUrl}`);
            
            // 模拟网络延迟
            setTimeout(() => {
                res.json(response);
            }, 500);

        } catch (error) {
            console.error('Mock: 头像上传失败:', error);
            
            const errorResponse: MockAvatarUploadResponse = {
                code: 500,
                data: {
                    url: '',
                    id: 0,
                    message: '服务器内部错误',
                    userId: 0
                },
                msg: '上传失败'
            };
            
            res.status(500).json(errorResponse);
        }
    }
};