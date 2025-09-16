package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Mapper接口
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    
    /**
     * 根据用户名查找用户
     * @param username 用户名
     * @return 用户信息
     */
    User selectByUsername(String username);
}
