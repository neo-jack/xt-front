package com.dyuloon.controller;

import com.dyuloon.entity.User;
import com.dyuloon.service.UserService;
import com.dyuloon.util.JwtUtil;
import com.dyuloon.util.MD5Util;
import com.dyuloon.util.ResultVOUtil;
import com.dyuloon.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * 修改密码控制器
 * 处理用户密码修改功能
 */
@RestController
@RequestMapping("/api")
public class SetpasswordController {

    private static final Logger logger = LoggerFactory.getLogger(SetpasswordController.class);
    
    // MD5格式验证正则表达式（32位十六进制）
    private static final Pattern MD5_PATTERN = Pattern.compile("^[a-f0-9]{32}$", Pattern.CASE_INSENSITIVE);
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 修改密码接口
     * POST /api/user/setpassword
     */
    @PostMapping("/user/setpassword")
    public ResultVO<Object> setPassword(
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("=== 密码修改请求开始 ===");
        
        try {
            // 获取请求参数
            String oldPassword = request.get("OLD_PWD");
            String newPassword = request.get("NEW_PWD");
            
            logger.info("接收到密码修改请求");
            logger.info("- OLD_PWD: {}", oldPassword != null ? oldPassword.substring(0, Math.min(10, oldPassword.length())) + "..." : "null");
            logger.info("- NEW_PWD: {}", newPassword != null ? newPassword.substring(0, Math.min(10, newPassword.length())) + "..." : "null");
            
            // 验证请求参数
            if (oldPassword == null || oldPassword.trim().isEmpty() ||
                newPassword == null || newPassword.trim().isEmpty()) {
                logger.warn("密码修改失败 - 参数验证失败：密码不能为空");
                return ResultVOUtil.error(400, "当前密码和新密码不能为空");
            }
            
            // 获取token并验证用户身份
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                logger.warn("密码修改失败 - 未提供有效token");
                return ResultVOUtil.error(401, "用户未登录或token已过期");
            }
            
            String token = authHeader.substring(7);
            String username = jwtUtil.getUsernameFromToken(token);
            
            if (username == null || !jwtUtil.validateToken(token)) {
                logger.warn("密码修改失败 - token验证失败");
                return ResultVOUtil.error(401, "用户未登录或token已过期");
            }
            
            logger.info("Token验证成功，用户名: {}", username);
            
            // 查找用户
            User user = userService.findByUsername(username);
            if (user == null) {
                logger.warn("密码修改失败 - 用户不存在: {}", username);
                return ResultVOUtil.error(404, "用户不存在");
            }
            
            logger.info("找到用户: {} (ID: {})", user.getUserName(), user.getId());
            
            // 验证新密码MD5格式
            if (!MD5_PATTERN.matcher(newPassword).matches()) {
                logger.warn("密码修改失败 - 新密码格式验证失败，不是有效的MD5格式");
                return ResultVOUtil.error(400, "新密码格式错误，必须是MD5格式");
            }
            
            // 验证当前密码（MD5直接比对）
            String storedPassword = user.getPassword();
            if (!oldPassword.equals(storedPassword)) {
                logger.warn("密码修改失败 - 当前密码验证失败");
                logger.info("输入密码: {}", oldPassword.substring(0, Math.min(8, oldPassword.length())) + "...");
                logger.info("存储密码: {}", storedPassword != null ? storedPassword.substring(0, Math.min(8, storedPassword.length())) + "..." : "null");
                return ResultVOUtil.error(400, "当前密码错误");
            }
            
            logger.info("当前密码验证成功");
            
            // 检查新密码是否与当前密码相同
            if (newPassword.equals(storedPassword)) {
                logger.warn("密码修改失败 - 新密码与当前密码相同");
                return ResultVOUtil.error(400, "新密码不能与当前密码相同");
            }
            
            logger.info("新密码验证通过，开始更新密码");
            
            // 更新用户密码
            String oldPwd = user.getPassword();
            user.setPassword(newPassword);
            boolean updateResult = userService.updateById(user);
            
            if (!updateResult) {
                logger.error("密码修改失败 - 数据库更新失败");
                return ResultVOUtil.error(500, "密码修改失败，请重试");
            }
            
            logger.info("===== 密码修改完成 =====");
            logger.info("用户: {} (ID: {})", user.getUserName(), user.getId());
            logger.info("旧MD5: {}", oldPwd != null ? oldPwd.substring(0, Math.min(8, oldPwd.length())) + "..." : "null");
            logger.info("新MD5: {}", newPassword.substring(0, Math.min(8, newPassword.length())) + "...");
            logger.info("数据库已更新");
            
            return ResultVOUtil.success("密码修改成功");
            
        } catch (Exception e) {
            logger.error("密码修改失败 - 未知异常: ", e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }
}
