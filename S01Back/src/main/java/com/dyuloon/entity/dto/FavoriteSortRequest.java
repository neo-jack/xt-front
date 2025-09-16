package com.dyuloon.entity.dto;

import lombok.Data;

import java.util.List;

/**
 * 收藏排序请求DTO
 */
@Data
public class FavoriteSortRequest {
    
    /**
     * 排序项目
     */
    @Data
    public static class SortItem {
        /**
         * 模块ID
         */
        private String id;
        
        /**
         * 排序序号
         */
        private Integer sort;
    }
    
    /**
     * 排序项目列表
     */
    private List<SortItem> sortItems;
}
