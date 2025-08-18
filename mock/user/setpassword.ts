import { mockUsers } from '../datebash/users';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Mock 请求接口类型定义
interface MockRequest {
  body: {
    OLD_PWD: string;    // 当前密码的哈希值
    NEW_PWD: string;    // 新密码的哈希值
    newPlainPassword?: string; // 新密码明文（仅用于Mock测试）
  };
  headers: {
    authorization?: string; // Bearer token
  };
}

//Mock 响应接口类型定义
interface MockResponse {
  json: (data: {
    code: number; //响应状态码：0-成功，其他-失败
    data: null; //修改密码成功时数据为null
    msg: string | null; //响应消息
  }) => void;
}

// MD5密码加密函数
const md5Hash = (password: string): string => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// 从token解析用户ID（使用与refresh.ts相同的逻辑）
const parseTokenUserId = (token: string): number | null => {
  console.log('[parseTokenUserId] 开始解析token');
  
  try {
    // 检查token是否存在且格式正确
    if (!token) {
      console.log('[parseTokenUserId] token为空');
      return null;
    }
    
    if (!token.startsWith('Bearer ')) {
      console.log('[parseTokenUserId] token格式错误，缺少Bearer前缀:', token.substring(0, 20) + '...');
      return null;
    }
    
    const tokenPart = token.replace('Bearer ', '');
    console.log('[parseTokenUserId] 提取token部分:', tokenPart.substring(0, 20) + '...');
    
    const parts = tokenPart.split('.');
    console.log('[parseTokenUserId] token分段数量:', parts.length);
    
    if (parts.length !== 3) {
      console.log('[parseTokenUserId] JWT格式错误，应该有3个部分，实际:', parts.length);
      return null;
    }
    
    // 解析payload部分（与refresh.ts保持一致）
    console.log('[parseTokenUserId] 开始解析payload部分');
    const payload = JSON.parse(atob(parts[1]));
    console.log('[parseTokenUserId] payload解析成功:', JSON.stringify(payload, null, 2));
    
    const userId = payload.userId || null;
    console.log('[parseTokenUserId] 提取到的用户ID:', userId);
    
    return userId;
  } catch (error) {
    console.error('[parseTokenUserId] 解析token时发生错误:', error);
    console.error('[parseTokenUserId] 错误堆栈:', error instanceof Error ? error.stack : 'Unknown error');
    return null;
  }
};

// 验证当前密码（MD5比对）
const verifyCurrentPassword = (inputMD5: string, storedMD5: string): boolean => {
  console.log('[verifyCurrentPassword] 开始验证当前密码');
  console.log('[verifyCurrentPassword] 输入MD5:', inputMD5 ? inputMD5.substring(0, 10) + '...' : 'null');
  console.log('[verifyCurrentPassword] 存储MD5:', storedMD5 ? storedMD5.substring(0, 10) + '...' : 'null');
  
  // MD5直接比对
  const isValid = inputMD5 === storedMD5;
  console.log('[verifyCurrentPassword] 验证结果:', isValid);
  
  return isValid;
};

// 处理新密码（MD5系统中直接使用MD5值）
const processNewPassword = (md5Password: string): string => {
  console.log('[processNewPassword] 开始处理新密码');
  console.log('[processNewPassword] 输入MD5:', md5Password ? md5Password.substring(0, 15) + '...' : 'null');
  
  // 验证MD5格式（32位十六进制）
  if (!/^[a-f0-9]{32}$/i.test(md5Password)) {
    console.error('[processNewPassword] 无效的MD5格式');
    throw new Error('无效的MD5密码格式');
  }
  
  console.log('[processNewPassword] MD5格式验证通过，直接使用');
  return md5Password;
};

// 修改源文件中的密码
const updatePasswordInSourceFile = (userId: number, newPassword: string): void => {
  console.log('[updatePasswordInSourceFile] 开始更新源文件密码');
  console.log('[updatePasswordInSourceFile] 用户ID:', userId);
  console.log('[updatePasswordInSourceFile] 新密码:', newPassword ? newPassword.substring(0, 5) + '...' : 'null');
  
  try {
    const filePath = path.join(__dirname, '../datebash/users/index.ts');
    console.log('[updatePasswordInSourceFile] 文件路径:', filePath);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('[updatePasswordInSourceFile] 文件读取成功，长度:', fileContent.length);
    
    // 根据用户ID找到对应的密码行并替换
    const lines = fileContent.split('\n');
    console.log('[updatePasswordInSourceFile] 文件总行数:', lines.length);
    
    let isTargetUser = false;
    let userIdFound = false;
    let passwordLineIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 检查是否是目标用户的用户ID行
      if (line.includes(`USER_ID: ${userId},`)) {
        console.log('[updatePasswordInSourceFile] 找到目标用户ID在行:', i + 1);
        userIdFound = true;
        isTargetUser = true;
        continue;
      }
      
      // 如果找到了目标用户，并且当前行是密码行
      if (isTargetUser && line.includes('password:')) {
        console.log('[updatePasswordInSourceFile] 找到密码行:', i + 1);
        console.log('[updatePasswordInSourceFile] 原密码行内容:', line.trim());
        
        // 提取缩进
        const indent = line.match(/^(\s*)/)?.[1] || '    ';
        console.log('[updatePasswordInSourceFile] 提取到的缩进长度:', indent.length);
        
        // 替换密码行
        lines[i] = `${indent}password: '${newPassword}',`;
        console.log('[updatePasswordInSourceFile] 新密码行内容:', lines[i].trim());
        
        passwordLineIndex = i;
        isTargetUser = false; // 重置标志
        break;
      }
      
      // 如果遇到下一个用户对象的开始，重置标志
      if (userIdFound && line.includes('USER_ID:') && !line.includes(`USER_ID: ${userId},`)) {
        console.log('[updatePasswordInSourceFile] 遇到下一个用户对象，重置标志');
        isTargetUser = false;
      }
    }
    
    if (passwordLineIndex === -1) {
      console.warn('[updatePasswordInSourceFile] 警告：未找到目标用户的密码行');
      return;
    }
    
    // 写回文件
    const updatedContent = lines.join('\n');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    
    console.log(`[updatePasswordInSourceFile] 源文件已更新，用户 ${userId} 的密码已修改为: ${newPassword}`);
    console.log('[updatePasswordInSourceFile] 文件更新成功');
  } catch (error) {
    console.error('[updatePasswordInSourceFile] 更新源文件失败:', error);
    console.error('[updatePasswordInSourceFile] 错误堆栈:', error instanceof Error ? error.stack : 'Unknown error');
  }
};

// 实现Mock API
export default {
  'POST /api/user/setpassword': (req: MockRequest, res: MockResponse) => {
    console.log('\n========== SetPassword API 开始 ==========');
    console.log('[SetPassword API] 接收到密码修改请求');
    
    const { OLD_PWD, NEW_PWD } = req.body;
    const authHeader = req.headers.authorization;

    console.log('[SetPassword API] 请求参数:');
    console.log('[SetPassword API] - OLD_PWD:', OLD_PWD ? OLD_PWD.substring(0, 10) + '...' : 'null');
    console.log('[SetPassword API] - NEW_PWD:', NEW_PWD ? NEW_PWD.substring(0, 10) + '...' : 'null');
    console.log('[SetPassword API] - Authorization:', authHeader ? authHeader.substring(0, 20) + '...' : 'null');

    // 验证请求参数
    if (!OLD_PWD || !NEW_PWD) {
      console.log('[SetPassword API] 参数验证失败：密码不能为空');
      return res.json({
        code: 1,
        data: null,
        msg: '当前密码和新密码不能为空',
      });
    }

    // 验证token并解析用户ID
    const userId = parseTokenUserId(authHeader || '');
    if (!userId) {
      console.log('[SetPassword API] Token验证失败');
      return res.json({
        code: 401,
        data: null,
        msg: '用户未登录或token已过期',
      });
    }

    console.log('[SetPassword API] Token验证成功，用户ID:', userId);

    // 查找用户
    const userIndex = mockUsers.findIndex(user => user.USER_ID === userId);
    if (userIndex === -1) {
      console.log('[SetPassword API] 用户查找失败，用户ID:', userId);
      return res.json({
        code: 404,
        data: null,
        msg: '用户不存在',
      });
    }

    const user = mockUsers[userIndex];
    console.log('[SetPassword API] 找到用户:', user.USER_NAME, '(ID:', userId, ')');

    // 验证当前密码（MD5比对）
    if (!verifyCurrentPassword(OLD_PWD, user.password)) {
      console.log('[SetPassword API] 当前密码验证失败');
      return res.json({
        code: 400,
        data: null,
        msg: '当前密码错误',
      });
    }

    console.log('[SetPassword API] 当前密码验证成功');

    // 验证新密码MD5格式
    if (!NEW_PWD || !/^[a-f0-9]{32}$/i.test(NEW_PWD)) {
      console.log('[SetPassword API] 新密码格式验证失败，不是有效的MD5格式');
      return res.json({
        code: 400,
        data: null,
        msg: '新密码格式错误，必须是MD5格式',
      });
    }

    // 处理新密码（验证MD5格式）
    const newMD5Password = processNewPassword(NEW_PWD);

    // 检查新密码是否与当前密码相同
    if (newMD5Password === user.password) {
      console.log('[SetPassword API] 新密码与当前密码相同');
      return res.json({
        code: 400,
        data: null,
        msg: '新密码不能与当前密码相同',
      });
    }

    console.log('[SetPassword API] 新密码验证通过，开始更新密码');

    // 直接修改用户数据库中的密码（存储MD5值）
    const oldPassword = mockUsers[userIndex].password;
    mockUsers[userIndex].password = newMD5Password;

    console.log('[SetPassword API] 内存数据库密码已更新');

    // 同时修改源文件中的密码
    updatePasswordInSourceFile(userId, newMD5Password);

    // 打印调试信息
    console.log(`[SetPassword API] ===== 密码修改完成 =====`);
    console.log(`[SetPassword API] 用户: ${user.USER_NAME} (ID: ${userId})`);
    console.log(`[SetPassword API] 旧MD5: ${oldPassword ? oldPassword.substring(0, 8) + '...' : 'null'}`);
    console.log(`[SetPassword API] 新MD5: ${newMD5Password ? newMD5Password.substring(0, 8) + '...' : 'null'}`);
    console.log(`[SetPassword API] 内存数据库已更新`);

    // 返回成功响应
    console.log('[SetPassword API] 返回成功响应');
    console.log('========== SetPassword API 结束 ==========\n');
    
    return res.json({
      code: 0,
      data: null,
      msg: '密码修改成功',
    });
  },
};
