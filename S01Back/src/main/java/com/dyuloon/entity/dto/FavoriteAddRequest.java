package com.dyuloon.entity.dto;

import lombok.Data;

/**
 * 添加收藏请求DTO
 */
@Data
public class FavoriteAddRequest {
    
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
}
