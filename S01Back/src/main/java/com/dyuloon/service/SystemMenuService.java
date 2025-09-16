package com.dyuloon.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dyuloon.entity.SystemMenu;

import java.util.List;

/**
 * 系统菜单服务接口
 */
public interface SystemMenuService extends IService<SystemMenu> {
    
    /**
     * 根据用户ID获取菜单树
     */
    List<SystemMenu> getMenuTreeByUserId(Long userId);
    
    /**
     * 根据用户ID获取一级菜单
     */
    List<SystemMenu> getRootMenusByUserId(Long userId);
    
    /**
     * 根据用户ID和父级编码获取子菜单
     */
    List<SystemMenu> getSubMenusByUserIdAndParentCode(Long userId, String parentCode);
}
