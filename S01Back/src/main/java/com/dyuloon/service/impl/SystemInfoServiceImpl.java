package com.dyuloon.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dyuloon.entity.SystemInfo;
import com.dyuloon.mapper.SystemInfoMapper;
import com.dyuloon.service.SystemInfoService;
import org.springframework.stereotype.Service;

/**
 * 系统信息服务实现类
 */
@Service
public class SystemInfoServiceImpl extends ServiceImpl<SystemInfoMapper, SystemInfo> implements SystemInfoService {
    
    @Override
    public SystemInfo getCurrentSystemInfo() {
        QueryWrapper<SystemInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id").last("LIMIT 1");
        return this.getOne(queryWrapper);
    }
    
    @Override
    public boolean updateSystemInfo(SystemInfo systemInfo) {
        SystemInfo current = getCurrentSystemInfo();
        if (current != null) {
            systemInfo.setId(current.getId());
            return this.updateById(systemInfo);
        } else {
            return this.save(systemInfo);
        }
    }
}
