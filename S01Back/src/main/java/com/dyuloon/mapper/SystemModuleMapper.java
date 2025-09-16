package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.SystemModule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 系统模块Mapper接口
 */
@Mapper
public interface SystemModuleMapper extends BaseMapper<SystemModule> {
    
    /**
     * 根据模块代码获取模块信息
     * @param moduleCode 模块代码
     * @return 模块信息
     */
    SystemModule selectByModuleCode(@Param("moduleCode") String moduleCode);

    /**
     * 根据分类名称获取模块列表
     * @param categoryName 分类名称
     * @return 模块列表
     */
    List<SystemModule> selectByCategoryName(@Param("categoryName") String categoryName);
}
