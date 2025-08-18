import { mockUsers } from '../datebash/users';
import * as fs from 'fs';
import * as path from 'path';

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

// 验证当前密码（简化版本 - 检查哈希格式）
const verifyCurrentPassword = (inputHash: string, storedPassword: string): boolean => {
  console.log('[verifyCurrentPassword] 开始验证当前密码');
  console.log('[verifyCurrentPassword] 输入哈希:', inputHash ? inputHash.substring(0, 10) + '...' : 'null');
  console.log('[verifyCurrentPassword] 存储密码:', storedPassword ? storedPassword.substring(0, 10) + '...' : 'null');
  
  // 简化验证：如果输入的是哈希值（长度大于10），认为验证通过
  // 实际项目中应该将storedPassword进行相同的哈希算法处理后比较
  const isValid = !!(inputHash && inputHash.length > 10);
  console.log('[verifyCurrentPassword] 验证结果:', isValid);
  
  return isValid;
};

// 解密新密码（真正的解密逻辑）
const decryptNewPassword = (hashedPassword: string): string => {
  console.log('[decryptNewPassword] 开始解密新密码');
  console.log('[decryptNewPassword] 输入密码:', hashedPassword ? hashedPassword.substring(0, 15) + '...' : 'null');
  
  try {
    // 如果是以 pwd_ 开头的哈希密码，进行 Base64 解码
    if (hashedPassword.startsWith('pwd_')) {
      console.log('[decryptNewPassword] 检测到pwd_前缀，开始Base64解码');
      const base64Part = hashedPassword.substring(4); // 去掉 pwd_ 前缀
      console.log('[decryptNewPassword] Base64部分:', base64Part.substring(0, 10) + '...');
      
      const decoded = Buffer.from(base64Part, 'base64').toString('utf8');
      console.log('[decryptNewPassword] 解码成功，明文密码:', decoded ? decoded.substring(0, 5) + '...' : 'null');
      return decoded;
    }
    
    // 如果不是哈希格式，直接返回
    console.log('[decryptNewPassword] 非pwd_格式，直接返回原值');
    return hashedPassword;
  } catch (error) {
    console.error('[decryptNewPassword] 密码解密失败:', error);
    console.error('[decryptNewPassword] 错误堆栈:', error instanceof Error ? error.stack : 'Unknown error');
    // 解密失败时返回原始哈希值
    return hashedPassword;
  }
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

    // 验证当前密码
    if (!verifyCurrentPassword(OLD_PWD, user.password)) {
      console.log('[SetPassword API] 当前密码验证失败');
      return res.json({
        code: 400,
        data: null,
        msg: '当前密码错误',
      });
    }

    console.log('[SetPassword API] 当前密码验证成功');

    // 验证新密码哈希格式
    if (!NEW_PWD || NEW_PWD.length < 10) {
      console.log('[SetPassword API] 新密码格式验证失败，长度:', NEW_PWD ? NEW_PWD.length : 0);
      return res.json({
        code: 400,
        data: null,
        msg: '新密码格式错误',
      });
    }

    // 解密新密码
    const newPlainPassword = decryptNewPassword(NEW_PWD);

    // 检查新密码是否与当前密码相同
    if (newPlainPassword === user.password) {
      console.log('[SetPassword API] 新密码与当前密码相同');
      return res.json({
        code: 400,
        data: null,
        msg: '新密码不能与当前密码相同',
      });
    }

    console.log('[SetPassword API] 新密码验证通过，开始更新密码');

    // 直接修改用户数据库中的密码
    const oldPassword = mockUsers[userIndex].password;
    mockUsers[userIndex].password = newPlainPassword;

    console.log('[SetPassword API] 内存数据库密码已更新');

    // 同时修改源文件中的密码
    updatePasswordInSourceFile(userId, newPlainPassword);

    // 打印调试信息
    console.log(`[SetPassword API] ===== 密码修改完成 =====`);
    console.log(`[SetPassword API] 用户: ${user.USER_NAME} (ID: ${userId})`);
    console.log(`[SetPassword API] 旧密码: ${oldPassword ? oldPassword.substring(0, 8) + '...' : 'null'}`);
    console.log(`[SetPassword API] 新密码: ${newPlainPassword ? newPlainPassword.substring(0, 8) + '...' : 'null'}`);
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
