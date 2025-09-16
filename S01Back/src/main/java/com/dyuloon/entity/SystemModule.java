package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统模块实体类
 */
@Data
@TableName("system_modules")
public class SystemModule {
    
    /**
     * 模块ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 模块代码
     */
    private String moduleCode;
    
    /**
     * 模块名称
     */
    private String moduleName;
    
    /**
     * 模块描述
     */
    private String description;
    
    /**
     * 图标
     */
    private String icon;
    
    /**
     * 端口
     */
    private Integer port;
    
    /**
     * 访问URL
     */
    private String url;
    
    /**
     * 状态：1-启用，0-禁用
     */
    private Integer status;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 分类名称
     */
    private String categoryName;
}
