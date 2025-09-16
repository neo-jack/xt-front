package com.dyuloon.controller;

import com.dyuloon.util.ResultVOUtil;
import com.dyuloon.vo.ResultVO;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 健康检查控制器
 * 用于测试API和JWT验证
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    /**
     * 公开的健康检查接口（不需要token）
     */
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 0);
        result.put("status", "OK");
        result.put("timestamp", System.currentTimeMillis());
        result.put("message", "Backend is running");
        
        return result;
    }

    /**
     * 受保护的用户信息接口（需要token）
     * 测试JWT拦截器是否正常工作
     */
    @GetMapping("/user/profile")
    public ResultVO<Map<String, Object>> getProfile(HttpServletRequest request) {
        // 从拦截器中获取用户信息
        Long userId = (Long) request.getAttribute("userId");
        String username = (String) request.getAttribute("username");
        String userRole = (String) request.getAttribute("userRole");

        Map<String, Object> profile = new HashMap<>();
        profile.put("userId", userId);
        profile.put("username", username);
        profile.put("userRole", userRole);
        profile.put("message", "成功获取用户信息");

        return ResultVOUtil.success(profile, "获取用户信息成功");
    }
}
