package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.UserAvatar;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * 用户头像Mapper接口
 */
@Mapper
public interface UserAvatarMapper extends BaseMapper<UserAvatar> {
    
    /**
     * 根据用户ID获取头像列表
     */
    @Select("SELECT * FROM user_avatars WHERE user_id = #{userId} ORDER BY created_at DESC")
    List<UserAvatar> selectByUserId(@Param("userId") Long userId);
    
    /**
     * 根据用户ID获取当前头像
     */
    @Select("SELECT * FROM user_avatars WHERE user_id = #{userId} AND is_current = 1 LIMIT 1")
    UserAvatar selectCurrentAvatar(@Param("userId") Long userId);
    
    /**
     * 将用户的所有头像设置为非当前状态
     */
    @Update("UPDATE user_avatars SET is_current = 0 WHERE user_id = #{userId}")
    int updateAllToNotCurrent(@Param("userId") Long userId);
    
    /**
     * 设置指定头像为当前头像
     */
    @Update("UPDATE user_avatars SET is_current = 1 WHERE id = #{avatarId} AND user_id = #{userId}")
    int setAsCurrent(@Param("avatarId") Long avatarId, @Param("userId") Long userId);
}
