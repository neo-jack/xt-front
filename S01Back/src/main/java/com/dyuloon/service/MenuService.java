package com.dyuloon.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.dyuloon.entity.SystemMenu;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 菜单服务类
 */
@Service
public class MenuService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 根据用户ID获取菜单列表
     * @param userId 用户ID
     * @return 菜单列表
     */
    public List<SystemMenu> getMenusByUserId(Long userId) {
        try {
            // 读取 system_menus.json 文件
            ClassPathResource resource = new ClassPathResource("data/system_menus.json");
            InputStream inputStream = resource.getInputStream();
            
            // 解析JSON文件为菜单列表
            List<SystemMenu> allMenus = objectMapper.readValue(
                inputStream, 
                new TypeReference<List<SystemMenu>>() {}
            );
            
            // 根据用户ID过滤菜单
            return allMenus.stream()
                    .filter(menu -> menu.getUserId().equals(userId))
                    .collect(Collectors.toList());
                    
        } catch (IOException e) {
            throw new RuntimeException("读取菜单数据失败", e);
        }
    }

    /**
     * 获取所有菜单
     * @return 所有菜单列表
     */
    public List<SystemMenu> getAllMenus() {
        try {
            ClassPathResource resource = new ClassPathResource("data/system_menus.json");
            InputStream inputStream = resource.getInputStream();
            
            return objectMapper.readValue(
                inputStream, 
                new TypeReference<List<SystemMenu>>() {}
            );
            
        } catch (IOException e) {
            throw new RuntimeException("读取菜单数据失败", e);
        }
    }
}
