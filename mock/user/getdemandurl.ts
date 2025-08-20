// 请求 post请求 /api/user/getdemandurl
import crypto from 'crypto';
import { parseTokenUserId } from '../utils/tokenid';
import { systemInfo } from '../datebash/system/index';
import { mockUsers } from '../datebash/users/index';

//MOCK_CONFIG 配置
const MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 请求二维码url定义
interface MockDemandUrlRequest {
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应二维码url定义
interface MockDemandUrlResponse {
    code: number;
    data: QRCodeUrl[];
    msg: string;
}

interface QRCodeUrl {
    url: string;
}


/**
 * 获取延迟时间
 * @returns 延迟时间(ms)
 */
const getDelayTime = (): number => {
    return MOCK_CONFIG.net ? MOCK_CONFIG.delay : 0;
};

/**
 * 检查是否应该模拟错误
 * @returns 是否返回错误
 */
const shouldReturnError = (): boolean => {
    return MOCK_CONFIG.net && Math.random() < MOCK_CONFIG.errorRate;
};

/**
 * 检查是否应该模拟超时
 * @returns 是否模拟超时
 */
const shouldReturnTimeout = (): boolean => {
    return MOCK_CONFIG.net && Math.random() < MOCK_CONFIG.timeoutRate;
};

/**
 * MD5加密函数
 * @param text 要加密的文本
 * @returns MD5哈希值
 */
const md5Encrypt = (text: string): string => {
    return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * 根据用户ID获取用户信息
 * @param userId 用户ID
 * @returns 用户信息或null
 */
const getUserById = (userId: number) => {
    return mockUsers.find(user => user.USER_ID === userId);
};

/**
 * 生成二维码URL
 * @param userRole 用户角色
 * @param hospitalName 医院名称
 * @param hospitalId 医院ID
 * @returns 生成的二维码URL
 */
const generateQRCodeUrl = (userRole: string, hospitalName: string, hospitalId: number): string => {
    // 对参数进行MD5加密
    const encryptedRole = md5Encrypt(userRole);
    const encryptedHospitalName = md5Encrypt(hospitalName);
    const encryptedHospitalId = md5Encrypt(hospitalId.toString());
    
    // 构建URL
    const baseUrl = `http://${systemInfo.servedomain}`;
    const url = `${baseUrl}/req-list?hospital_id=${encryptedHospitalId}&hospital_name=${encryptedHospitalName}&log_id=${encryptedRole}&`;
    
    return url;
};

export default {
    'POST /api/user/getdemandurl': (req: MockDemandUrlRequest, res: any) => {
        console.log('[getdemandurl] 收到二维码URL获取请求');
        
        // 检查是否应该模拟超时
        if (shouldReturnTimeout()) {
            console.log('[getdemandurl] 模拟请求超时');
            // 不返回任何响应，模拟超时
            return;
        }
        
        // 获取延迟时间
        const delayTime = getDelayTime();
        if (delayTime > 0) {
            console.log(`[getdemandurl] 模拟延迟: ${delayTime}ms`);
        }
        
        const processRequest = () => {
            try {
                // 从请求头获取token
                const token = req.headers.authorization;
                
                if (!token) {
                    console.log('[getdemandurl] 未提供token');
                    return res.json({
                        code: 401,
                        data: [],
                        msg: '未提供认证token'
                    });
                }
                
                // 解析token获取用户ID
                const userId = parseTokenUserId(token);
                
                if (!userId) {
                    console.log('[getdemandurl] token解析失败');
                    return res.json({
                        code: 401,
                        data: [],
                        msg: 'token解析失败'
                    });
                }
                
                // 根据用户ID获取用户信息
                const user = getUserById(userId);
                
                if (!user) {
                    console.log('[getdemandurl] 用户不存在，用户ID:', userId);
                    return res.json({
                        code: 404,
                        data: [],
                        msg: '用户不存在'
                    });
                }
                
                // 检查是否应该返回错误
                if (shouldReturnError()) {
                    console.log('[getdemandurl] 模拟错误响应');
                    return res.json({
                        code: -1,
                        data: [],
                        msg: '服务暂时不可用，请稍后重试'
                    });
                }
                
                // 生成二维码URL
                const qrCodeUrl = generateQRCodeUrl(
                    user.USER_ROLE,
                    user.HOSPITAL_CNAME,
                    user.HOSPITAL_ID
                );
                
                console.log('[getdemandurl] 生成二维码URL成功');
                
                // 返回成功响应
                const response: MockDemandUrlResponse = {
                    code: 0,
                    data: [{
                        url: qrCodeUrl
                    }],
                    msg: '二维码URL获取成功'
                };
                
                return res.json(response);
                
            } catch (error) {
                console.error('[getdemandurl] 处理请求时发生错误:', error);
                return res.json({
                    code: 500,
                    data: [],
                    msg: '服务器内部错误'
                });
            }
        };
        
        // 根据配置决定是否延迟执行
        if (delayTime > 0) {
            setTimeout(processRequest, delayTime);
        } else {
            processRequest();
        }
    }
};


