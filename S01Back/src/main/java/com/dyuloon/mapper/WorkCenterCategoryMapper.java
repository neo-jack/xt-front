package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.WorkCenterCategory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 工作中心分类 Mapper 接口
 */
@Mapper
public interface WorkCenterCategoryMapper extends BaseMapper<WorkCenterCategory> {
    
    /**
     * 查询所有启用的分类，按排序号排序
     * @return 分类列表
     */
    @Select("SELECT * FROM work_center_categories WHERE status = 1 ORDER BY sort_order ASC, id ASC")
    List<WorkCenterCategory> selectEnabledCategories();
}
