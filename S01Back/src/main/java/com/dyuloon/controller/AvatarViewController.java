package com.dyuloon.controller;

import com.dyuloon.entity.UserAvatar;
import com.dyuloon.service.UserAvatarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;

/**
 * 动态头像访问控制器
 * 通过解析URL路径，查询数据库并返回base64解码后的图片数据
 */
@Slf4j
@RestController
public class AvatarViewController {

    @Autowired
    private UserAvatarService userAvatarService;
    
    /**
     * 测试端点 - 验证控制器是否正常工作
     */
    @GetMapping("/datebash/test")
    public String test() {
        return "AvatarViewController is working!";
    }

    /**
     * 动态头像访问 - 处理 /datebash/acators/** 路径
     * 解析URL路径，查询数据库并返回base64解码后的图片数据
     */
    @GetMapping("/datebash/acators/{filename:.+}")
    public ResponseEntity<Resource> getAvatarByPath(@PathVariable String filename, HttpServletRequest request) {
        try {
            // 构建完整的文件URL路径
            String requestPath = "/datebash/acators/" + filename;
            log.info("[AvatarView] 接收到头像请求: {} (filename: {})", requestPath, filename);

            // 查询数据库中匹配的头像记录
            UserAvatar avatar = userAvatarService.getByFileUrl(requestPath);
            if (avatar == null) {
                log.warn("[AvatarView] 未找到对应的头像记录: {}", requestPath);
                return ResponseEntity.notFound().build();
            }

            // 检查是否有base64数据
            String base64Data = avatar.getData();
            if (base64Data == null || base64Data.isEmpty()) {
                log.warn("[AvatarView] 头像记录存在但无数据: ID={}, URL={}", avatar.getId(), requestPath);
                return ResponseEntity.notFound().build();
            }

            // 解析base64数据
            byte[] imageBytes = decodeBase64Image(base64Data);
            if (imageBytes == null) {
                log.error("[AvatarView] Base64数据解析失败: ID={}", avatar.getId());
                return ResponseEntity.badRequest().build();
            }

            // 获取内容类型
            String contentType = avatar.getMimeType();
            if (contentType == null || contentType.isEmpty()) {
                contentType = "image/png"; // 默认为PNG
            }

            log.info("[AvatarView] 成功返回头像: ID={}, 大小={}bytes, 类型={}", 
                    avatar.getId(), imageBytes.length, contentType);

            // 创建Resource并返回
            ByteArrayResource resource = new ByteArrayResource(imageBytes);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .contentLength(imageBytes.length)
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600") // 缓存1小时
                    .body(resource);

        } catch (Exception e) {
            log.error("[AvatarView] 处理头像请求失败: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 解析base64图片数据
     */
    private byte[] decodeBase64Image(String base64Data) {
        try {
            // 处理data URL格式: data:image/png;base64,xxxxx
            if (base64Data.startsWith("data:")) {
                int commaIndex = base64Data.indexOf(',');
                if (commaIndex != -1) {
                    base64Data = base64Data.substring(commaIndex + 1);
                }
            }
            
            // 解码base64数据
            return Base64.getDecoder().decode(base64Data);
            
        } catch (IllegalArgumentException e) {
            log.error("[AvatarView] Base64解码失败: {}", e.getMessage());
            return null;
        }
    }
}





