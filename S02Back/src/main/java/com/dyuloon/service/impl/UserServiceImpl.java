package com.dyuloon.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dyuloon.entity.User;
import com.dyuloon.mapper.UserMapper;
import com.dyuloon.service.UserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public User findByUsername(String username) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, username)
               .eq(User::getStatus, 1); // 只查询启用状态的用户
        return getOne(wrapper);
    }

    @Override
    public User login(String username, String password) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, username)
               .eq(User::getPassword, password)
               .eq(User::getStatus, 1); // 只查询启用状态的用户
        return getOne(wrapper);
    }

    @Override
    public void updateLoginInfo(Long userId, String ip, String token) {
        User user = new User();
        user.setId(userId);
        user.setIp(ip);
        user.setToken(token);
        // 增加登录次数
        User existUser = getById(userId);
        if (existUser != null) {
            user.setLoginCount((existUser.getLoginCount() == null ? 0 : existUser.getLoginCount()) + 1);
        }
        updateById(user);
    }
}
