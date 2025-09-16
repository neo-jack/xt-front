package com.dyuloon.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dyuloon.entity.UserAvatar;
import com.dyuloon.mapper.UserAvatarMapper;
import com.dyuloon.service.UserAvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户头像服务实现类
 */
@Service
public class UserAvatarServiceImpl extends ServiceImpl<UserAvatarMapper, UserAvatar> implements UserAvatarService {
    
    @Autowired
    private UserAvatarMapper userAvatarMapper;
    
    @Override
    public List<UserAvatar> getAvatarsByUserId(Long userId) {
        return userAvatarMapper.selectByUserId(userId);
    }
    
    @Override
    public UserAvatar getCurrentAvatar(Long userId) {
        return userAvatarMapper.selectCurrentAvatar(userId);
    }
    
    @Override
    @Transactional
    public boolean setAsCurrentAvatar(Long userId, Long avatarId) {
        // 先将用户的所有头像设置为非当前状态
        userAvatarMapper.updateAllToNotCurrent(userId);
        
        // 设置指定头像为当前头像
        return userAvatarMapper.setAsCurrent(avatarId, userId) > 0;
    }
    
    @Override
    @Transactional
    public UserAvatar uploadAvatar(Long userId, String fileName, String fileUrl, String mimeType, Long fileSize) {
        // 创建新头像记录
        UserAvatar avatar = new UserAvatar();
        avatar.setUserId(userId);
        avatar.setFileName(fileName);
        avatar.setFileUrl(fileUrl);
        avatar.setMimeType(mimeType);
        avatar.setFileSize(fileSize);
        avatar.setIsCurrent(false); // 默认不是当前头像
        avatar.setCreatedAt(LocalDateTime.now());
        avatar.setUpdatedAt(LocalDateTime.now());
        
        // 保存头像记录
        this.save(avatar);
        
        return avatar;
    }
}
