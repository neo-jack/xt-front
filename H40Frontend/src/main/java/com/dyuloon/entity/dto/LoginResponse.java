package com.dyuloon.entity.dto;

import lombok.Data;

/**
 * 登录响应DTO
 */
@Data
public class LoginResponse {
    private String token;
    private UserInfo userInfo;
    
    @Data
    public static class UserInfo {
        private Long id;
        private String username;
        private String name;  // 对应nickname
        private String avatar;
        private String role;
        private String[] routes;  // 路由权限
        private String[] buttons; // 按钮权限
    }
}
