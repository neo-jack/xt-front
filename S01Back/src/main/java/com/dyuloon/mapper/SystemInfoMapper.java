package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.SystemInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * 系统信息Mapper接口
 */
@Mapper
public interface SystemInfoMapper extends BaseMapper<SystemInfo> {
    
}