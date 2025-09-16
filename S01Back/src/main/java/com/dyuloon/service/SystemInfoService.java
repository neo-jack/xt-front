package com.dyuloon.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dyuloon.entity.SystemInfo;

/**
 * 系统信息服务接口
 */
public interface SystemInfoService extends IService<SystemInfo> {
    
    /**
     * 获取当前系统信息
     */
    SystemInfo getCurrentSystemInfo();
    
    /**
     * 更新系统信息
     */
    boolean updateSystemInfo(SystemInfo systemInfo);
}
