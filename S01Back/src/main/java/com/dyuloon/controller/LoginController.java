package com.dyuloon.controller; // 声明这个文件属于哪个包（文件夹）

// 导入需要使用的其他类，就像在文件开头写明需要用到的工具
import com.dyuloon.entity.User; // 导入用户实体类，用来表示数据库中的用户信息
import com.dyuloon.entity.dto.LoginRequest; // 导入登录请求的数据结构
import com.dyuloon.entity.dto.LoginResponse; // 导入登录响应的数据结构
import com.dyuloon.entity.dto.RefreshTokenRequest; // 导入刷新token请求的数据结构
import com.dyuloon.entity.dto.RefreshTokenResponse; // 导入刷新token响应的数据结构
import com.dyuloon.service.UserService; // 导入用户服务类，用来处理用户相关的业务逻辑
import com.dyuloon.util.JwtUtil; // 导入JWT工具类，用来生成和验证登录凭证
import com.dyuloon.util.MD5Util; // 导入MD5工具类，用来加密密码
import com.dyuloon.util.ResultVOUtil; // 导入结果工具类，用来统一包装返回给前端的数据
import com.dyuloon.vo.ResultVO; // 导入结果对象类，定义返回数据的格式
import org.springframework.beans.factory.annotation.Autowired; // 导入自动注入注解
import org.springframework.web.bind.annotation.*; // 导入Spring Web相关的注解
import org.slf4j.Logger; // 导入日志记录器
import org.slf4j.LoggerFactory; // 导入日志工厂


/**
 * 用户登录控制器类
 * 这个类专门处理用户的登录、登出、获取用户信息等操作
 * 就像前台接待员，负责处理所有与用户身份认证相关的请求
 *
 * @author dyuloon
 */
@RestController // 告诉Spring这是一个控制器类，会自动处理网络请求并返回JSON数据
@RequestMapping("/api/user") // 设置这个控制器处理的网址前缀为 /api/user
public class LoginController {
    
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    
    @Autowired 
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil; 

    @PostMapping("/login") // 表示这个方法处理POST请求，完整路径是 /api/user/login
    public ResultVO<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        logger.info("=== 登录请求开始 ===");
        
        // @RequestBody 表示从请求体中获取JSON数据并转换为LoginRequest对象
        
        String username = loginRequest.getUsername(); // 从请求对象中取出用户名
        String password = loginRequest.getPassword(); // 从请求对象中取出密码
        
        logger.info("接收到登录请求 - 用户名: {}, 密码长度: {}", username, password != null ? password.length() : 0);
        
        // 参数验证：检查用户名和密码是否为空或者只有空格
        if (username == null || username.trim().isEmpty() || 
            password == null || password.trim().isEmpty()) {
            // trim()去掉前后空格，isEmpty()检查是否为空字符串
            logger.warn("登录失败 - 用户名或密码为空");
            return ResultVOUtil.fail("用户名和密码不能为空"); // 如果为空，返回失败消息
        }
        
        // 直接使用前端发送的密码（前端已经MD5加密）与数据库中的MD5密码对比
        // 不进行二次MD5加密，直接传递给service层进行比较
        
        // 用户登录验证：直接使用前端发送的密码与数据库进行对比
        User user = userService.login(username, password); // 调用用户服务的登录方法
        if (user == null) { // 如果返回null，说明用户名或密码错误
            logger.warn("登录失败 - 用户名或密码错误，用户名: {}", username);
            return ResultVOUtil.fail("用户名或密码错误"); // 返回失败消息
        }
        
        logger.info("用户登录成功 - 用户ID: {}, 用户名: {}, 角色: {}", user.getId(), user.getUsername(), user.getUserRole());
        
        // 客户端IP设为默认值，在生产环境中可以通过代理或负载均衡器获取
        String clientIp = "0.0.0.0"; // 简化处理
        
        // 构造响应数据：准备要返回给前端的数据
        LoginResponse loginResponse = new LoginResponse();
        
        // 生成访问令牌和刷新令牌
        String accessToken = jwtUtil.generateToken(user.getUsername(), user.getUserRole(), user.getId());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername(), user.getUserRole(), user.getId());
        
        logger.info("JWT Token生成成功 - AccessToken长度: {}, RefreshToken长度: {}", 
                   accessToken != null ? accessToken.length() : 0, 
                   refreshToken != null ? refreshToken.length() : 0);
        
        // 更新用户登录信息：在数据库中记录用户的登录时间、IP、token等信息
        userService.updateLoginInfo(user.getId(), clientIp, accessToken);
        
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setExpiresIn(3600); // 1小时过期
        
        logger.info("设置响应数据 - AccessToken长度: {}, RefreshToken长度: {}, ExpiresIn: {}", 
                   accessToken.length(), refreshToken.length(), 3600);
        
        // 创建用户信息对象
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setUSER_ID(user.getId());
        userInfo.setUSER_NAME(user.getUserName());
        userInfo.setUSER_AVATAR(user.getUserAvatar());
        userInfo.setUSER_ROLE(user.getUserRole());
        userInfo.setHOSPITAL_CNAME(user.getHospitalCname());
        userInfo.setHOSPITAL_ID(user.getHospitalId());
        
        loginResponse.setUSER(userInfo);
        
        // 返回成功结果：告诉前端登录成功，并把token和用户信息返回
        logger.info("=== 登录请求处理完成，返回成功响应 ===");
        return ResultVOUtil.success(loginResponse, "登录成功");
    }

    /**
     * 用户登出方法
     * 当用户点击退出登录时，这个方法会被调用
     * 主要功能：清除用户的登录状态，让token失效
     */
    @PostMapping("/logout") // 表示这个方法处理POST请求，完整路径是 /api/user/logout
    public ResultVO<Void> logout(@RequestHeader(value = "Authorization", required = false) String token) {
        // @RequestHeader 表示从请求头中获取token，required = false表示这个参数不是必须的
        // 请求头就像信件的信封，包含一些额外的信息
        
        // 检查是否有token并且格式正确
        if (token != null && token.startsWith("Bearer ")) { // 标准的token格式是 "Bearer xxxx"
            token = token.substring(7); // 去掉前面的"Bearer "，只保留实际的token内容
            
            // 验证token是否有效
            if (jwtUtil.validateToken(token)) { // 检查token是否过期或被篡改
                Long userId = jwtUtil.getUserIdFromToken(token); // 从token中提取用户ID
                if (userId != null) { // 如果能成功提取到用户ID
                    // 清除用户token：在数据库中把用户的token设为空，表示已登出
                    userService.updateLoginInfo(userId, null, null);
                    // 传入null表示清空IP和token信息
                }
            }
        }
        // 返回成功结果：无论token是否有效都返回成功，避免泄露信息
        return ResultVOUtil.success(null, "登出成功");
    }

    /**
     * 获取当前用户信息方法
     * 当前端需要获取当前登录用户的详细信息时调用
     * 主要功能：验证用户身份，返回用户详细信息和权限
     */
    @GetMapping("/info") // 表示这个方法处理GET请求，完整路径是 /api/user/info
    public ResultVO<LoginResponse.UserInfo> getUserInfo(@RequestHeader(value = "Authorization", required = false) String token) {
        // @RequestHeader 从请求头中获取Authorization字段，这里存放着用户的token
        
        // 检查token是否存在且格式正确
        if (token == null || !token.startsWith("Bearer ")) {
            // 如果没有token或格式不对，说明用户没有登录
            return ResultVOUtil.fail("未登录");
        }
        
        token = token.substring(7); // 去掉"Bearer "前缀，获取真实token
        
        // 验证token是否有效（没过期、没被篡改）
        if (!jwtUtil.validateToken(token)) {
            return ResultVOUtil.fail("登录已过期"); // token无效，要求重新登录
        }
        
        // 从token中提取用户ID
        Long userId = jwtUtil.getUserIdFromToken(token);
        
        // 根据用户ID从数据库获取用户完整信息
        User user = userService.getById(userId);
        if (user == null) { // 如果数据库中找不到这个用户
            return ResultVOUtil.fail("用户不存在"); // 可能用户被删除了
        }
        
        // 构造用户信息对象，准备返回给前端
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setUSER_ID(user.getId());
        userInfo.setUSER_NAME(user.getUserName());
        userInfo.setUSER_AVATAR(user.getUserAvatar());
        userInfo.setUSER_ROLE(user.getUserRole());
        userInfo.setHOSPITAL_CNAME(user.getHospitalCname());
        userInfo.setHOSPITAL_ID(user.getHospitalId());
        
        // 返回成功结果，把用户信息发送给前端
        return ResultVOUtil.success(userInfo, "获取用户信息成功");
    }
    

    /**
     * 刷新Token接口
     * 当access token即将过期时，前端可以使用refresh token来获取新的token
     */
    @PostMapping("/refresh")
    public ResultVO<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest refreshRequest) {
        String refreshToken = refreshRequest.getRefreshToken();
        
        // 验证请求参数
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            return ResultVOUtil.fail("刷新令牌不能为空");
        }
        
        // 移除Bearer前缀（如果存在）
        String cleanToken = refreshToken;
        if (refreshToken.startsWith("Bearer ")) {
            cleanToken = refreshToken.substring(7);
        }
        
        // 验证refresh token
        if (!jwtUtil.validateToken(cleanToken)) {
            return ResultVOUtil.fail("刷新令牌格式无效");
        }
        
        // 检查token是否过期
        if (jwtUtil.isTokenExpired(cleanToken)) {
            return ResultVOUtil.fail("刷新令牌已过期，请重新登录");
        }
        
        // 从token中获取用户信息
        String username = jwtUtil.getUsernameFromToken(cleanToken);
        String role = jwtUtil.getRoleFromToken(cleanToken);
        Long userId = jwtUtil.getUserIdFromToken(cleanToken);
        
        if (userId == null || userId <= 0) {
            return ResultVOUtil.fail("刷新令牌中的用户信息无效");
        }
        
        // 验证用户是否仍然存在
        User user = userService.findById(userId);
        if (user == null) {
            return ResultVOUtil.fail("用户不存在");
        }
        
        // 生成新的token
        String newAccessToken = jwtUtil.generateToken(username, role, userId);
        String newRefreshToken = jwtUtil.generateRefreshToken(username, role, userId);
        
        // 构造响应
        RefreshTokenResponse response = new RefreshTokenResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(newRefreshToken);
        response.setExpiresIn(3600); // 1小时
        
        return ResultVOUtil.success(response, "Token刷新成功");
    }

}