package com.dyuloon.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dyuloon.entity.User;
import com.dyuloon.mapper.UserMapper;
import com.dyuloon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    public User findById(Long userId) {
        return userMapper.selectById(userId);
    }

    @Override
    public User login(String username, String password) {
        User user = userMapper.selectByUsername(username);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    @Override
    public void updateLoginInfo(Long userId, String ip, String token) {
        // 由于新的用户表结构没有ip和token字段，这里保留方法但不执行更新
        // 如果需要记录登录信息，可以考虑创建登录日志表
    }

    @Override
    public boolean updateUserAvatar(Long userId, String avatarUrl) {
        return userMapper.updateUserAvatar(userId, avatarUrl) > 0;
    }
}
