package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.UserLoginLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户登录日志Mapper接口
 */
@Mapper
public interface UserLoginLogMapper extends BaseMapper<UserLoginLog> {
    
    /**
     * 根据用户ID获取登录日志
     */
    @Select("SELECT * FROM user_login_logs WHERE user_id = #{userId} ORDER BY login_time DESC LIMIT #{limit}")
    List<UserLoginLog> selectByUserId(@Param("userId") Long userId, @Param("limit") int limit);
    
    /**
     * 根据用户ID和时间范围获取登录日志
     */
    @Select("SELECT * FROM user_login_logs WHERE user_id = #{userId} AND login_time BETWEEN #{startTime} AND #{endTime} ORDER BY login_time DESC")
    List<UserLoginLog> selectByUserIdAndTimeRange(@Param("userId") Long userId, 
                                                  @Param("startTime") LocalDateTime startTime, 
                                                  @Param("endTime") LocalDateTime endTime);
    
    /**
     * 获取最近的登录记录
     */
    @Select("SELECT * FROM user_login_logs WHERE user_id = #{userId} AND login_status = 1 ORDER BY login_time DESC LIMIT 1")
    UserLoginLog selectLatestSuccessLogin(@Param("userId") Long userId);
}
