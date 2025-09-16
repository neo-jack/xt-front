package com.dyuloon.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dyuloon.entity.UserAvatar;

import java.util.List;

/**
 * 用户头像服务接口
 */
public interface UserAvatarService extends IService<UserAvatar> {
    
    /**
     * 根据用户ID获取头像列表
     */
    List<UserAvatar> getAvatarsByUserId(Long userId);
    
    /**
     * 获取用户当前头像
     */
    UserAvatar getCurrentAvatar(Long userId);
    
    /**
     * 设置头像为当前头像
     */
    boolean setAsCurrentAvatar(Long userId, Long avatarId);
    
    /**
     * 上传新头像
     */
    UserAvatar uploadAvatar(Long userId, String fileName, String fileUrl, String mimeType, Long fileSize);
    
    /**
     * 根据文件URL获取头像
     */
    UserAvatar getByFileUrl(String fileUrl);
}
