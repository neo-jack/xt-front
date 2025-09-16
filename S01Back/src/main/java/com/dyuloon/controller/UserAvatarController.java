package com.dyuloon.controller;

import com.dyuloon.entity.UserAvatar;
import com.dyuloon.service.UserAvatarService;
import com.dyuloon.service.UserService;
import com.dyuloon.util.JwtUtil;
import com.dyuloon.vo.ResultVO;
import com.dyuloon.util.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户头像控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserAvatarController {

    @Autowired
    private UserAvatarService userAvatarService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 获取用户头像列表
     */
    @PostMapping("/getheadshotlist")
    public ResultVO<List<UserAvatar>> getHeadshotList(HttpServletRequest request) {
        try {
            // 从token获取用户ID
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            log.info("[UserAvatarController] 获取用户{}的头像列表", userId);
            List<UserAvatar> avatars = userAvatarService.getAvatarsByUserId(userId);
            
            return ResultVOUtil.success(avatars, "获取头像列表成功");

        } catch (Exception e) {
            log.error("[UserAvatarController] 获取头像列表失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }


    /**
     * 获取用户当前头像
     */
    @PostMapping("/getcurrentavatar")
    public ResultVO<UserAvatar> getCurrentAvatar(HttpServletRequest request) {
        try {
            // 从token获取用户ID
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            log.info("[UserAvatarController] 获取用户{}的当前头像", userId);
            UserAvatar currentAvatar = userAvatarService.getCurrentAvatar(userId);
            
            return ResultVOUtil.success(currentAvatar, "获取当前头像成功");

        } catch (Exception e) {
            log.error("[UserAvatarController] 获取当前头像失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 上传头像
     */
    @PostMapping("/avatorupload")
    public ResultVO<AvatarUploadResponse> uploadAvatar(@RequestBody AvatarUploadRequest request, HttpServletRequest httpRequest) {
        try {
            // 从token获取用户ID
            String token = httpRequest.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            if (request.getAvatar() == null || request.getAvatar().trim().isEmpty()) {
                return ResultVOUtil.error(400, "头像数据不能为空");
            }

            // 解析base64数据
            String base64Data = request.getAvatar();
            if (base64Data.startsWith("data:")) {
                int commaIndex = base64Data.indexOf(',');
                if (commaIndex != -1) {
                    base64Data = base64Data.substring(commaIndex + 1);
                }
            }

            // 生成文件名和URL
            String fileName = "user_" + userId + "_" + System.currentTimeMillis() + ".png";
            String fileUrl = "/datebash/acators/" + fileName;
            
            // 创建头像记录
            UserAvatar avatar = new UserAvatar();
            avatar.setUserId(userId);
            avatar.setFileName(fileName);
            avatar.setFileUrl(fileUrl);
            avatar.setMimeType("image/png");
            avatar.setFileSize((long) base64Data.length());
            avatar.setData(request.getAvatar()); // 保存原始base64数据
            avatar.setIsCurrent(false); // 默认不是当前头像
            avatar.setCreatedAt(java.time.LocalDateTime.now());
            avatar.setUpdatedAt(java.time.LocalDateTime.now());
            
            // 保存头像记录
            userAvatarService.save(avatar);
            
            // 同时更新users表的user_avatar字段
            boolean updateResult = userService.updateUserAvatar(userId, fileUrl);
            if (!updateResult) {
                log.warn("[UserAvatarController] 用户{}更新user_avatar字段失败", userId);
            }
            
            log.info("[UserAvatarController] 用户{}上传头像成功，文件名: {}", userId, fileName);
            
            // 构造响应
            AvatarUploadResponse response = new AvatarUploadResponse();
            response.setUrl(fileUrl);
            response.setId(avatar.getId());
            response.setMessage("头像上传成功");
            response.setUserId(userId);
            
            return ResultVOUtil.success(response, "头像上传成功");

        } catch (Exception e) {
            log.error("[UserAvatarController] 头像上传失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 设置头像为当前头像
     */
    @PostMapping("/setcurrentavatar")
    public ResultVO<String> setCurrentAvatar(@RequestBody SetCurrentAvatarRequest request, HttpServletRequest httpRequest) {
        try {
            // 从token获取用户ID
            String token = httpRequest.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            if (request.getAvatarId() == null) {
                return ResultVOUtil.error(400, "头像ID不能为空");
            }

            log.info("[UserAvatarController] 用户{}设置头像{}为当前头像", userId, request.getAvatarId());
            boolean success = userAvatarService.setAsCurrentAvatar(userId, request.getAvatarId());
            
            if (success) {
                return ResultVOUtil.success("设置当前头像成功");
            } else {
                return ResultVOUtil.error(400, "设置当前头像失败");
            }

        } catch (Exception e) {
            log.error("[UserAvatarController] 设置当前头像失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 头像上传请求DTO
     */
    public static class AvatarUploadRequest {
        private String avatar;

        public String getAvatar() {
            return avatar;
        }

        public void setAvatar(String avatar) {
            this.avatar = avatar;
        }
    }

    /**
     * 头像上传响应DTO
     */
    public static class AvatarUploadResponse {
        private String url;
        private Long id;
        private String message;
        private Long userId;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

    /**
     * 设置当前头像请求DTO
     */
    public static class SetCurrentAvatarRequest {
        private Long avatarId;

        public Long getAvatarId() {
            return avatarId;
        }

        public void setAvatarId(Long avatarId) {
            this.avatarId = avatarId;
        }
    }
}
