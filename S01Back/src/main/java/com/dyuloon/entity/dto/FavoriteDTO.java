package com.dyuloon.entity.dto;

import lombok.Data;

/**
 * 收藏模块DTO
 */
@Data
public class FavoriteDTO {
    
    /**
     * 模块ID
     */
    private String id;
    
    /**
     * 模块名称
     */
    private String name;
    
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
    private Integer sort;
}
