package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.SystemMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 系统菜单Mapper接口
 */
@Mapper
public interface SystemMenuMapper extends BaseMapper<SystemMenu> {
    
    /**
     * 根据用户ID获取菜单列表
     */
    @Select("SELECT * FROM system_menus WHERE user_id = #{userId} ORDER BY level ASC, CAST(menu_sort AS UNSIGNED) ASC")
    List<SystemMenu> selectMenusByUserId(@Param("userId") Long userId);
    
    /**
     * 根据用户ID和父级编码获取子菜单
     */
    @Select("SELECT * FROM system_menus WHERE user_id = #{userId} AND parent_code = #{parentCode} ORDER BY CAST(menu_sort AS UNSIGNED) ASC")
    List<SystemMenu> selectSubMenus(@Param("userId") Long userId, @Param("parentCode") String parentCode);
    
    /**
     * 根据用户ID获取一级菜单
     */
    @Select("SELECT * FROM system_menus WHERE user_id = #{userId} AND level = 1 ORDER BY CAST(menu_sort AS UNSIGNED) ASC")
    List<SystemMenu> selectRootMenus(@Param("userId") Long userId);
}
