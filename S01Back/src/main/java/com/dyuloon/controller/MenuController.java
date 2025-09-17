package com.dyuloon.controller;

import com.dyuloon.dto.MenuItemDTO;
import com.dyuloon.entity.SystemMenu;
import com.dyuloon.entity.User;
import com.dyuloon.service.MenuService;
import com.dyuloon.service.UserService;
import com.dyuloon.util.JwtUtil;
import com.dyuloon.util.ResultVOUtil;
import com.dyuloon.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 菜单控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private UserService userService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 获取用户菜单接口
     */
    @PostMapping("/getmues")
    public ResultVO<List<MenuItemDTO>> getMenus(@RequestHeader(value = "Authorization", required = false) String token) {
        // 检查token是否存在且格式正确
        if (token == null || !token.startsWith("Bearer ")) {
            return ResultVOUtil.fail("缺少授权token");
        }

        token = token.substring(7); // 去掉"Bearer "前缀

        // 验证token是否有效
        if (!jwtUtil.validateToken(token)) {
            return ResultVOUtil.fail("token已过期，请重新登录");
        }

        // 从token中提取用户ID
        Long userId = jwtUtil.getUserIdFromToken(token);
        if (userId == null) {
            return ResultVOUtil.fail("无效的用户token");
        }

        // 根据用户ID从数据库获取用户信息
        User user = userService.getById(userId);
        if (user == null) {
            return ResultVOUtil.fail("用户不存在");
        }

        try {
            log.info("[MenuController] 获取用户{}的层级菜单", userId);
            
            // 从数据库获取用户的所有菜单（平铺结构）
            List<SystemMenu> flatMenus = menuService.getMenusByUserId(userId);
            
            if (flatMenus.isEmpty()) {
                log.warn("[MenuController] 用户{}没有可用的菜单", userId);
                return ResultVOUtil.success(new ArrayList<>(), "用户暂无可用菜单");
            }
            
            // 构建层级菜单树结构
            List<MenuItemDTO> hierarchicalMenus = buildHierarchicalMenus(flatMenus);
            
            log.info("[MenuController] 成功获取用户{}的菜单，共{}项", userId, hierarchicalMenus.size());
            return ResultVOUtil.success(hierarchicalMenus, "获取菜单成功");
            
        } catch (Exception e) {
            log.error("[MenuController] 获取用户{}菜单失败: {}", userId, e.getMessage(), e);
            return ResultVOUtil.fail("读取菜单数据失败：" + e.getMessage());
        }
    }

    /**
     * 从平铺的菜单列表构建层级菜单树
     * @param flatMenus 平铺的菜单列表
     * @return 层级菜单树
     */
    private List<MenuItemDTO> buildHierarchicalMenus(List<SystemMenu> flatMenus) {
        log.info("[MenuController] 开始构建层级菜单，平铺菜单数量: {}", flatMenus.size());
        
        // 创建菜单映射表，便于查找
        Map<String, SystemMenu> menuMap = flatMenus.stream()
                .collect(Collectors.toMap(SystemMenu::getMenuNo, menu -> menu));
        
        // 创建结果列表和已处理菜单集合
        List<MenuItemDTO> rootMenus = new ArrayList<>();
        Set<String> processedMenus = new HashSet<>();
        
        // 找出根菜单（parent_code 为 H57 或与 sys_menu 相同的菜单）
        for (SystemMenu menu : flatMenus) {
            if (isRootMenu(menu) && !processedMenus.contains(menu.getMenuNo())) {
                MenuItemDTO rootMenuDTO = buildMenuTree(menu, menuMap, processedMenus);
                rootMenus.add(rootMenuDTO);
            }
        }
        
        // 按菜单排序排序
        rootMenus.sort(Comparator.comparing(MenuItemDTO::getMenuSort, Comparator.nullsLast(String::compareTo)));
        
        log.info("[MenuController] 层级菜单构建完成，根菜单数量: {}", rootMenus.size());
        return rootMenus;
    }
    
    /**
     * 判断是否为根菜单
     * @param menu 菜单项
     * @return 是否为根菜单
     */
    private boolean isRootMenu(SystemMenu menu) {
        String parentCode = menu.getParentCode();
        String sysMenu = menu.getSysMenu();
        
        // 如果 parent_code 等于 sys_menu，则认为是根菜单
        return parentCode != null && parentCode.equals(sysMenu);
    }
    
    /**
     * 递归构建菜单树
     * @param currentMenu 当前菜单
     * @param menuMap 菜单映射表
     * @param processedMenus 已处理菜单集合
     * @return 菜单DTO
     */
    private MenuItemDTO buildMenuTree(SystemMenu currentMenu, Map<String, SystemMenu> menuMap, Set<String> processedMenus) {
        // 标记当前菜单已处理
        processedMenus.add(currentMenu.getMenuNo());
        
        // 转换为DTO
        MenuItemDTO menuDTO = convertToMenuItemDTO(currentMenu);
        
        // 查找子菜单
        List<MenuItemDTO> subMenus = new ArrayList<>();
        for (SystemMenu menu : menuMap.values()) {
            // 如果某个菜单的 parent_code 等于当前菜单的 menu_no，则它是子菜单
            if (!processedMenus.contains(menu.getMenuNo()) && 
                currentMenu.getMenuNo().equals(menu.getParentCode())) {
                MenuItemDTO subMenuDTO = buildMenuTree(menu, menuMap, processedMenus);
                subMenus.add(subMenuDTO);
            }
        }
        
        // 对子菜单排序
        subMenus.sort(Comparator.comparing(MenuItemDTO::getMenuSort, Comparator.nullsLast(String::compareTo)));
        menuDTO.setSubMenu(subMenus);
        
        return menuDTO;
    }
    
    /**
     * 将 SystemMenu 转换为 MenuItemDTO
     * @param systemMenu 系统菜单
     * @return 菜单DTO
     */
    private MenuItemDTO convertToMenuItemDTO(SystemMenu systemMenu) {
        MenuItemDTO dto = new MenuItemDTO();
        dto.setSynergyId(systemMenu.getSynergyId());
        dto.setMenuNo(systemMenu.getMenuNo());
        dto.setMenuName(systemMenu.getMenuName());
        dto.setMenuIcon(systemMenu.getMenuIcon());
        dto.setMenuUrl(systemMenu.getMenuUrl());
        dto.setSysMenu(systemMenu.getSysMenu());
        dto.setParentCode(systemMenu.getParentCode());
        dto.setMenuModule(systemMenu.getMenuModule());
        dto.setMenuSort(systemMenu.getMenuSort());
        dto.setBecallModuleId(systemMenu.getBecallModuleId());
        dto.setSubMenu(new ArrayList<>()); // 初始化为空列表
        return dto;
    }
    
    /**
     * 检查用户是否有指定菜单的访问权限
     * @param userId 用户ID
     * @param menuNo 菜单编号
     * @return 是否有权限
     */
    public boolean hasMenuPermission(Long userId, String menuNo) {
        try {
            List<SystemMenu> userMenus = menuService.getMenusByUserId(userId);
            return userMenus.stream().anyMatch(menu -> menuNo.equals(menu.getMenuNo()));
        } catch (Exception e) {
            log.error("[MenuController] 检查用户{}菜单{}权限失败: {}", userId, menuNo, e.getMessage());
            return false;
        }
    }
}
