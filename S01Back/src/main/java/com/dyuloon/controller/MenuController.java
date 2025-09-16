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

import java.util.*;
import java.util.stream.Collectors;

/**
 * 菜单控制器
 */
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
            // 从 system_menus.json 文件中读取用户的菜单数据
            List<SystemMenu> userMenus = menuService.getMenusByUserId(userId);
            
            // 转换为前端期望的数据格式
            List<MenuItemDTO> menuList = userMenus.stream()
                    .map(this::convertToMenuItemDTO)
                    .sorted(Comparator.comparing(MenuItemDTO::getMenuSort))
                    .collect(Collectors.toList());

            return ResultVOUtil.success(menuList, "获取菜单成功");
            
        } catch (Exception e) {
            return ResultVOUtil.fail("读取菜单数据失败：" + e.getMessage());
        }
    }

    /**
     * 将 SystemMenu 转换为前端期望的 MenuItemDTO 格式
     */
    private MenuItemDTO convertToMenuItemDTO(SystemMenu systemMenu) {
        MenuItemDTO dto = new MenuItemDTO();
        dto.setId(String.valueOf(systemMenu.getId()));
        dto.setName(systemMenu.getMenuName());
        dto.setIcon(systemMenu.getMenuIcon());
        dto.setUrl(systemMenu.getMenuUrl());
        dto.setMenuNo(systemMenu.getMenuNo());
        dto.setSysMenu(systemMenu.getSysMenu());
        dto.setParentCode(systemMenu.getParentCode());
        dto.setMenuSort(systemMenu.getMenuSort());
        dto.setLevel(systemMenu.getLevel());
        
        return dto;
    }
}
