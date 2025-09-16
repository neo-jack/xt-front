package com.dyuloon.entity.dto;

import lombok.Data;

import java.util.List;

/**
 * 工作中心分类列表响应DTO
 * 对应前端 GetClassResponse 接口
 */
@Data
public class WorkCenterClassResponse {
    
    /**
     * 响应码：0-成功，其他-失败
     */
    private Integer code;
    
    /**
     * 分类列表数据
     */
    private List<ClassItem> data;
    
    /**
     * 响应消息
     */
    private String msg;
    
    /**
     * 分类项数据
     * 对应前端 ClassItem 接口
     */
    @Data
    public static class ClassItem {
        
        /**
         * 分类ID
         */
        private String id;
        
        /**
         * 分类名称
         */
        private String name;
        
        /**
         * 分类图标
         */
        private String icon;
    }
}
