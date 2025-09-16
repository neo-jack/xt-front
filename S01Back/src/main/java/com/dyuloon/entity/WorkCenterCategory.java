package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 工作中心分类实体类
 * 对应前端 ClassItem 数据结构
 */
@Data
@TableName("work_center_categories")
public class WorkCenterCategory {
    
    /**
     * 主键ID (自增)
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 分类标识符 (对应前端的 id)
     */
    @TableField("category_id")
    private String categoryId;
    
    /**
     * 分类名称
     */
    @TableField("category_name")
    private String categoryName;
    
    /**
     * 分类图标
     */
    @TableField("category_icon")
    private String categoryIcon;
    
    /**
     * 分类键值，用于菜单选择和路由
     */
    @TableField("category_key")
    private String categoryKey;
    
    /**
     * 排序号
     */
    @TableField("sort_order")
    private Integer sortOrder;
    
    /**
     * 状态：1-启用，0-禁用
     */
    private Integer status;
    
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
