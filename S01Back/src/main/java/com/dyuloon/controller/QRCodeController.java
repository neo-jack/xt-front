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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 二维码控制器
 * 处理二维码URL生成功能
 */
@RestController
@RequestMapping("/api")
public class QRCodeController {

    private static final Logger logger = LoggerFactory.getLogger(QRCodeController.class);
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    // 系统域名配置（可以从配置文件读取）
    @Value("${system.server.domain:localhost:8080}")
    private String serverDomain;

    /**
     * 获取二维码URL接口
     * POST /api/user/getdemandurl
     */
    @PostMapping("/user/getdemandurl")
    public ResultVO<List<Map<String, String>>> getDemandUrl(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("=== 二维码URL获取请求开始 ===");
        
        try {
            // 获取token并验证用户身份
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                logger.warn("二维码URL获取失败 - 未提供有效token");
                return ResultVOUtil.error(401, "未提供认证token");
            }
            
            String token = authHeader.substring(7);
            String username = jwtUtil.getUsernameFromToken(token);
            
            if (username == null || !jwtUtil.validateToken(token)) {
                logger.warn("二维码URL获取失败 - token验证失败");
                return ResultVOUtil.error(401, "token解析失败");
            }
            
            // 获取用户信息
            User user = userService.findByUsername(username);
            if (user == null) {
                logger.warn("二维码URL获取失败 - 用户不存在: {}", username);
                return ResultVOUtil.error(404, "用户不存在");
            }
            
            logger.info("用户 {} 请求生成二维码URL", username);
            
            // 生成二维码URL
            String qrCodeUrl = generateQRCodeUrl(user);
            
            // 构造响应数据
            List<Map<String, String>> responseData = new ArrayList<>();
            Map<String, String> urlMap = new HashMap<>();
            urlMap.put("url", qrCodeUrl);
            responseData.add(urlMap);
            
            logger.info("二维码URL生成成功 - 用户: {}", username);
            
            return ResultVOUtil.success(responseData, "二维码URL获取成功");
            
        } catch (Exception e) {
            logger.error("二维码URL获取失败 - 异常: ", e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 生成二维码URL
     * 根据用户角色、医院名称、医院ID生成加密的URL
     */
    private String generateQRCodeUrl(User user) {
        try {
            // 获取用户信息
            String userRole = user.getUserRole() != null ? user.getUserRole() : "user";
            String hospitalName = user.getHospitalCname() != null ? user.getHospitalCname() : "default";
            Long hospitalId = user.getHospitalId() != null ? user.getHospitalId() : 0L;
            
            // 对参数进行MD5加密
            String encryptedRole = MD5Util.encrypt(userRole);
            String encryptedHospitalName = MD5Util.encrypt(hospitalName);
            String encryptedHospitalId = MD5Util.encrypt(hospitalId.toString());
            
            // 构建URL
            String baseUrl = "http://" + serverDomain;
            String url = String.format("%s/req-list?hospital_id=%s&hospital_name=%s&log_id=%s&",
                    baseUrl, encryptedHospitalId, encryptedHospitalName, encryptedRole);
            
            logger.info("生成二维码URL: 用户角色={}, 医院名称={}, 医院ID={}",
                    userRole, hospitalName, hospitalId);
            
            return url;
            
        } catch (Exception e) {
            logger.error("生成二维码URL失败: ", e);
            // 返回默认URL
            return "http://" + serverDomain + "/req-list?error=generation_failed";
        }
    }
}