package com.dyuloon.controller;

import com.dyuloon.entity.UserAvatar;
import com.dyuloon.service.UserAvatarService;
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
