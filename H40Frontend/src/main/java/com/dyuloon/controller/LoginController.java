package com.dyuloon.controller; // 声明这个文件属于哪个包（文件夹）

// 导入需要使用的其他类，就像在文件开头写明需要用到的工具
import com.dyuloon.entity.User; // 导入用户实体类，用来表示数据库中的用户信息
import com.dyuloon.entity.dto.LoginRequest; // 导入登录请求的数据结构
import com.dyuloon.entity.dto.LoginResponse; // 导入登录响应的数据结构
import com.dyuloon.service.UserService; // 导入用户服务类，用来处理用户相关的业务逻辑
import com.dyuloon.util.JwtUtil; // 导入JWT工具类，用来生成和验证登录凭证
import com.dyuloon.util.MD5Util; // 导入MD5工具类，用来加密密码
import com.dyuloon.util.ResultVOUtil; // 导入结果工具类，用来统一包装返回给前端的数据
import com.dyuloon.vo.ResultVO; // 导入结果对象类，定义返回数据的格式
import org.springframework.beans.factory.annotation.Autowired; // 导入自动注入注解
import org.springframework.web.bind.annotation.*; // 导入Spring Web相关的注解

import javax.servlet.http.HttpServletRequest; // 导入HTTP请求对象，用来获取请求相关信息

/**
 * 用户登录控制器类
 * 这个类专门处理用户的登录、登出、获取用户信息等操作
 * 就像前台接待员，负责处理所有与用户身份认证相关的请求
 *
 * @author dyuloon
 */
@RestController // 告诉Spring这是一个控制器类，会自动处理网络请求并返回JSON数据
@RequestMapping("/api/user") // 设置这个控制器处理的网址前缀为 /api/user
@CrossOrigin(origins = "*") // 允许所有网站跨域访问这个接口（在实际项目中应该限制具体域名）
public class LoginController {
    
    @Autowired 
    private UserService userService; 

    @PostMapping("/login") // 表示这个方法处理POST请求，完整路径是 /api/user/login
    public ResultVO<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        // @RequestBody 表示从请求体中获取JSON数据并转换为LoginRequest对象
        // HttpServletRequest request 用来获取请求的详细信息（比如IP地址）
        
        String username = loginRequest.getUsername(); // 从请求对象中取出用户名
        String password = loginRequest.getPassword(); // 从请求对象中取出密码
        
        // 参数验证：检查用户名和密码是否为空或者只有空格
        if (username == null || username.trim().isEmpty() || 
            password == null || password.trim().isEmpty()) {
            // trim()去掉前后空格，isEmpty()检查是否为空字符串
            return ResultVOUtil.fail("用户名和密码不能为空"); // 如果为空，返回失败消息
        }
        
        // 密码MD5加密：为了安全，不能直接存储明文密码
        String encryptedPassword = MD5Util.encrypt(password); // 把用户输入的密码进行MD5加密
        
        // 用户登录验证：拿加密后的密码去数据库查找匹配的用户
        User user = userService.login(username, encryptedPassword); // 调用用户服务的登录方法
        if (user == null) { // 如果返回null，说明用户名或密码错误
            return ResultVOUtil.fail("用户名或密码错误"); // 返回失败消息
        }
        
        // 生成JWT token：创建一个登录凭证，用户后续访问时需要携带这个凭证
        String token = JwtUtil.generateToken(user.getUsername(), user.getRole(), user.getId());
        // JWT像是一张临时通行证，包含了用户的基本信息
        
        // 获取客户端IP：记录用户是从哪个IP地址登录的，用于安全审计
        String clientIp = getClientIp(request); // 调用我们自己写的获取IP的方法
        
        // 更新用户登录信息：在数据库中记录用户的登录时间、IP、token等信息
        userService.updateLoginInfo(user.getId(), clientIp, token);
        
        // 构造响应数据：准备要返回给前端的数据
        LoginResponse loginResponse = new LoginResponse(); // 创建一个登录响应对象
        loginResponse.setToken(token); // 把生成的token放到响应对象中
        
        // 创建用户信息对象：准备返回给前端的用户详细信息
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(); // 创建用户信息对象
        userInfo.setId(user.getId()); // 设置用户ID
        userInfo.setUsername(user.getUsername()); // 设置用户名
        // 设置显示名称：如果用户有昵称就用昵称，没有就用用户名
        userInfo.setName(user.getNickname() != null ? user.getNickname() : user.getUsername());
        userInfo.setAvatar(user.getAvatar()); // 设置用户头像地址
        userInfo.setRole(user.getRole()); // 设置用户角色（如管理员、普通用户等）
        
        // 根据角色设置权限：不同的用户角色有不同的权限
        if ("root".equals(user.getRole())) { // 如果是超级管理员
            userInfo.setRoutes(new String[]{"*"}); // 可以访问所有页面
            userInfo.setButtons(new String[]{"*"}); // 可以使用所有按钮功能
        } else if ("super".equals(user.getRole())) { // 如果是高级管理员
            userInfo.setRoutes(new String[]{"/dashboard", "/user", "/system"}); // 可以访问这些页面
            userInfo.setButtons(new String[]{"add", "edit", "delete", "view"}); // 可以使用这些按钮
        } else { // 如果是普通用户
            userInfo.setRoutes(new String[]{"/dashboard", "/profile"}); // 只能访问仪表板和个人资料页面
            userInfo.setButtons(new String[]{"view"}); // 只能查看，不能修改
        }
        
        loginResponse.setUserInfo(userInfo); // 把用户信息放到响应对象中
        
        // 返回成功结果：告诉前端登录成功，并把token和用户信息返回
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
            if (JwtUtil.validateToken(token)) { // 检查token是否过期或被篡改
                Long userId = JwtUtil.getUserIdFromToken(token); // 从token中提取用户ID
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
        if (!JwtUtil.validateToken(token)) {
            return ResultVOUtil.fail("登录已过期"); // token无效，要求重新登录
        }
        
        // 从token中提取用户ID
        Long userId = JwtUtil.getUserIdFromToken(token);
        
        // 根据用户ID从数据库获取用户完整信息
        User user = userService.getById(userId);
        if (user == null) { // 如果数据库中找不到这个用户
            return ResultVOUtil.fail("用户不存在"); // 可能用户被删除了
        }
        
        // 构造用户信息对象，准备返回给前端
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setId(user.getId()); // 设置用户ID
        userInfo.setUsername(user.getUsername()); // 设置用户名
        // 设置显示名：优先使用昵称，没有昵称就用用户名
        userInfo.setName(user.getNickname() != null ? user.getNickname() : user.getUsername());
        userInfo.setAvatar(user.getAvatar()); // 设置头像地址
        userInfo.setRole(user.getRole()); // 设置用户角色
        
        // 根据角色设置权限：不同角色有不同的页面访问权限和操作权限
        if ("root".equals(user.getRole())) { // 超级管理员
            userInfo.setRoutes(new String[]{"*"}); // "*"表示可以访问所有页面
            userInfo.setButtons(new String[]{"*"}); // "*"表示可以使用所有功能按钮
        } else if ("super".equals(user.getRole())) { // 高级管理员
            userInfo.setRoutes(new String[]{"/dashboard", "/user", "/system"}); // 可访问的页面列表
            userInfo.setButtons(new String[]{"add", "edit", "delete", "view"}); // 可使用的功能按钮
        } else { // 普通用户
            userInfo.setRoutes(new String[]{"/dashboard", "/profile"}); // 只能访问基础页面
            userInfo.setButtons(new String[]{"view"}); // 只有查看权限
        }
        
        // 返回成功结果，把用户信息发送给前端
        return ResultVOUtil.success(userInfo, "获取用户信息成功");
    }
    
    /**
     * 获取客户端真实IP地址的私有方法
     * 由于网络环境复杂（可能有代理服务器、负载均衡器等），需要多种方式尝试获取真实IP
     * 这个方法会按照优先级顺序尝试不同的方式来获取用户的真实IP地址
     */
    private String getClientIp(HttpServletRequest request) {
        // private表示这个方法只能在当前类内部使用
        
        // 第一种方式：尝试从X-Forwarded-For请求头获取IP
        // 当请求经过代理服务器时，代理通常会在这个头部记录原始IP
        String ip = request.getHeader("X-Forwarded-For");
        
        // 检查获取到的IP是否有效
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            // 如果第一种方式失败，尝试第二种方式：Proxy-Client-IP
            // 这是某些代理服务器使用的头部字段
            ip = request.getHeader("Proxy-Client-IP");
        }
        
        // 继续检查IP是否有效
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            // 如果前两种方式都失败，尝试第三种方式：WL-Proxy-Client-IP
            // 这是WebLogic代理服务器使用的头部字段
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        
        // 最后的检查
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            // 如果所有代理头部都没有获取到IP，就直接获取连接的IP地址
            // 这是最基本的获取方式，但如果有代理的话，这个IP可能是代理服务器的IP
            ip = request.getRemoteAddr();
        }
        
        // 处理多个IP的情况：如果IP字符串中包含逗号，说明可能有多个IP
        if (ip != null && ip.contains(",")) {
            // 如果有多个IP（比如"192.168.1.1, 10.0.0.1"），取第一个
            // split(",")按逗号分割字符串，[0]取第一个元素，trim()去掉空格
            ip = ip.split(",")[0].trim();
        }
        
        return ip; // 返回获取到的IP地址
    }
}