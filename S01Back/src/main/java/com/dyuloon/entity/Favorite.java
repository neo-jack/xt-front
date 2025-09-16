package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户收藏实体类
 */
@Data
@TableName("user_favorites")
public class Favorite {
    
    /**
     * 收藏ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 模块ID
     */
    private String moduleId;
    
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
     * 排序序号
     */
    private Integer sortOrder;
    
    /**
     * 是否收藏
     */
    @TableField("is_favorite")
    private Integer isFavorite;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
