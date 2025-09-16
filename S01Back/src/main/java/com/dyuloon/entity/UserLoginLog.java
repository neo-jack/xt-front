package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户登录日志实体类
 */
@Data
@TableName("user_login_logs")
public class UserLoginLog {
    
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 登录IP
     */
    @TableField("login_ip")
    private String loginIp;

    /**
     * 登录时间
     */
    @TableField("login_time")
    private LocalDateTime loginTime;

    /**
     * 用户代理
     */
    @TableField("user_agent")
    private String userAgent;

    /**
     * 登录状态(1:成功, 0:失败)
     */
    @TableField("login_status")
    private Boolean loginStatus;

    /**
     * 访问令牌
     */
    @TableField("access_token")
    private String accessToken;

    /**
     * 刷新令牌
     */
    @TableField("refresh_token")
    private String refreshToken;

    /**
     * 登出时间
     */
    @TableField("logout_time")
    private LocalDateTime logoutTime;

    /**
     * 创建时间
     */
    @TableField("created_at")
    private LocalDateTime createdAt;
}
