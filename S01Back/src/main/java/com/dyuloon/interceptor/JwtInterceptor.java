package com.dyuloon.interceptor;

import com.dyuloon.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

// 临时禁用 - 由于 Spring Boot 3.x 迁移问题
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

/**
 * JWT拦截器
 * 临时禁用 - 由于 Spring Boot 3.x 迁移问题
 * 目前每个控制器都有自己的 token 验证
 */
// @Component  // 临时注释掉
public class JwtInterceptor /* implements HandlerInterceptor */ {

    // @Autowired
    // private JwtUtil jwtUtil;

    // 临时注释掉整个方法
    /*
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 实现代码暂时注释
        return true;
    }
    */
}
