package com.dyuloon.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.MultipartConfigElement;
import java.io.File;

/**
 * 文件上传配置
 */
@Slf4j
@Configuration
public class FileUploadConfig implements WebMvcConfigurer {

    // 头像上传目录
    public static final String AVATAR_UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "avatars" + File.separator;
    
    // 其他文件上传目录
    public static final String FILE_UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "files" + File.separator;

    /**
     * 配置文件上传限制
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        
        // 单个文件最大 10MB
        factory.setMaxFileSize(DataSize.ofMegabytes(10));
        
        // 总上传大小最大 50MB
        factory.setMaxRequestSize(DataSize.ofMegabytes(50));
        
        return factory.createMultipartConfig();
    }

    /**
     * 配置静态资源访问
     * 头像现在通过动态API访问，不需要静态文件配置
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 头像现在通过 AvatarViewController 动态提供
        // 不再需要静态文件映射
        log.info("头像访问已配置为动态API模式");
    }

    /**
     * 创建上传目录
     */
    private void createUploadDirectories() {
        File avatarDir = new File(AVATAR_UPLOAD_DIR);
        if (!avatarDir.exists()) {
            boolean created = avatarDir.mkdirs();
            if (created) {
                System.out.println("创建头像上传目录: " + AVATAR_UPLOAD_DIR);
            }
        }
        
        File fileDir = new File(FILE_UPLOAD_DIR);
        if (!fileDir.exists()) {
            boolean created = fileDir.mkdirs();
            if (created) {
                System.out.println("创建文件上传目录: " + FILE_UPLOAD_DIR);
            }
        }
    }
}
