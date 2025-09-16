package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.Favorite;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户收藏Mapper接口
 */
@Mapper
public interface FavoriteMapper extends BaseMapper<Favorite> {
    
    /**
     * 根据用户ID获取收藏列表（按排序）
     * @param userId 用户ID
     * @return 收藏列表
     */
    List<Favorite> selectByUserIdOrderBySort(@Param("userId") Long userId);
    
    /**
     * 检查用户是否已收藏该模块
     * @param userId 用户ID
     * @param moduleId 模块ID
     * @return 收藏记录
     */
    Favorite selectByUserIdAndModuleId(@Param("userId") Long userId, @Param("moduleId") String moduleId);
    
    /**
     * 获取用户收藏的最大排序号
     * @param userId 用户ID
     * @return 最大排序号
     */
    Integer selectMaxSortOrderByUserId(@Param("userId") Long userId);
    
    /**
     * 更新收藏排序
     * @param userId 用户ID
     * @param moduleId 模块ID
     * @param sortOrder 排序号
     */
    void updateSortOrder(@Param("userId") Long userId, @Param("moduleId") String moduleId, @Param("sortOrder") Integer sortOrder);
}
