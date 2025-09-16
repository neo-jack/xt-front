package com.dyuloon.config;

import com.dyuloon.interceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web配置类
 * 配置拦截器、跨域等
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // @Autowired
    // private JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 暂时禁用JWT拦截器以便调试
        /*
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/api/**") // 拦截所有api接口
                .excludePathPatterns(
                        "/api/user/login",    // 排除登录接口
                        "/api/user/refresh"   // 排除刷新token接口
                );
        */
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)  // 修复CORS错误：设置为false或使用allowedOriginPatterns
                .maxAge(3600);
    }
}
