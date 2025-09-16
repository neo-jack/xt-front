package com.dyuloon.service;

import com.dyuloon.entity.SystemMenu;
import com.dyuloon.mapper.SystemMenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 菜单服务类
 */
@Service
public class MenuService {

    @Autowired
    private SystemMenuMapper systemMenuMapper;

    /**
     * 根据用户ID获取菜单列表
     * @param userId 用户ID
     * @return 菜单列表
     */
    public List<SystemMenu> getMenusByUserId(Long userId) {
        return systemMenuMapper.selectMenusByUserId(userId);
    }

    /**
     * 获取所有菜单
     * @return 所有菜单列表
     */
    public List<SystemMenu> getAllMenus() {
        return systemMenuMapper.selectList(null);
    }
}
