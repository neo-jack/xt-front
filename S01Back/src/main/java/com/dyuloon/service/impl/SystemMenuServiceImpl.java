package com.dyuloon.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dyuloon.entity.SystemMenu;
import com.dyuloon.mapper.SystemMenuMapper;
import com.dyuloon.service.SystemMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 系统菜单服务实现类
 */
@Service
public class SystemMenuServiceImpl extends ServiceImpl<SystemMenuMapper, SystemMenu> implements SystemMenuService {
    
    @Autowired
    private SystemMenuMapper systemMenuMapper;
    
    @Override
    public List<SystemMenu> getMenuTreeByUserId(Long userId) {
        // 获取用户的所有菜单
        List<SystemMenu> allMenus = systemMenuMapper.selectMenusByUserId(userId);
        
        // 按层级分组
        Map<Integer, List<SystemMenu>> menuMap = allMenus.stream()
                .collect(Collectors.groupingBy(SystemMenu::getLevel));
        
        // 构建菜单树
        List<SystemMenu> rootMenus = menuMap.getOrDefault(1, new ArrayList<>());
        
        // 递归构建子菜单
        for (SystemMenu rootMenu : rootMenus) {
            buildSubMenus(rootMenu, allMenus);
        }
        
        return rootMenus;
    }
    
    @Override
    public List<SystemMenu> getRootMenusByUserId(Long userId) {
        return systemMenuMapper.selectRootMenus(userId);
    }
    
    @Override
    public List<SystemMenu> getSubMenusByUserIdAndParentCode(Long userId, String parentCode) {
        return systemMenuMapper.selectSubMenus(userId, parentCode);
    }
    
    /**
     * 递归构建子菜单
     */
    private void buildSubMenus(SystemMenu parentMenu, List<SystemMenu> allMenus) {
        List<SystemMenu> subMenus = allMenus.stream()
                .filter(menu -> parentMenu.getMenuNo().equals(menu.getParentCode()))
                .collect(Collectors.toList());
        
        if (!subMenus.isEmpty()) {
            parentMenu.setSubMenus(subMenus);
            // 递归构建子菜单的子菜单
            for (SystemMenu subMenu : subMenus) {
                buildSubMenus(subMenu, allMenus);
            }
        }
    }
}
