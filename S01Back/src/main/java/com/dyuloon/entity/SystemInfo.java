package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统信息实体类
 * 基于 Datebash/system/index.ts
 */
@Data
@TableName("system_info")
public class SystemInfo {
    
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 客户端IP地址
     */
    @TableField("client_ip")
    private String clientIp;

    /**
     * 服务器域名
     */
    @TableField("server_domain")
    private String serverDomain;

    /**
     * 系统版本号
     */
    private String version;

    /**
     * 主版本号
     */
    @TableField("major_version")
    private Integer majorVersion;

    /**
     * 创建时间
     */
    @TableField("created_at")
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
