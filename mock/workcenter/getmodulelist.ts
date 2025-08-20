//MOCK_CONFIG 配置
const GETDULELIST_MOCK_CONFIG = {
    net: false,              // 启用网络模拟
    delay: 1000,            // 延迟时间(ms)
    errorRate: 0.05,        // 5%错误率
    timeoutRate: 0.02,      // 2%超时率
};

// Mock 请求定义
interface MockDemandUrlRequest {
    body: {
        id: string;//菜单栏id
    };
    headers: {
        authorization?: string; // Bearer token
    };
}

// Mock 响应定义
interface MockDemandUrlResponse {
    code: number;
    data: [];
    msg: string;
}
