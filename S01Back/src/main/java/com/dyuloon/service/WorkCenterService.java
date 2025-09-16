package com.dyuloon.service;

import com.dyuloon.entity.SystemModule;
import com.dyuloon.entity.dto.WorkCenterClassResponse;

import java.util.List;

/**
 * 工作中心服务接口
 */
public interface WorkCenterService {
    
    /**
     * 获取工作中心分类列表
     * @return 分类列表响应
     */
    WorkCenterClassResponse getCategories();

    /**
     * 根据分类名称获取模块列表
     * @param name 分类名称
     * @return 模块列表
     */
    List<SystemModule> getModulesByName(String name);
}
