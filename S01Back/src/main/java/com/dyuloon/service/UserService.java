package com.dyuloon.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dyuloon.entity.User;

/**
 * 用户服务接口
 */
public interface UserService extends IService<User> {
    
    /**
     * 根据用户名查找用户
     */
    User findByUsername(String username);
    
    /**
     * 根据用户ID查找用户
     */
    User findById(Long userId);
    
    /**
     * 用户登录
     */
    User login(String username, String password);
    
    /**
     * 更新用户登录信息
     */
    void updateLoginInfo(Long userId, String ip, String token);
    
    /**
     * 更新用户头像
     */
    boolean updateUserAvatar(Long userId, String avatarUrl);
}
