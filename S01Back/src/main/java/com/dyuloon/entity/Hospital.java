package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 医院信息实体类
 */
@Data
@TableName("hospitals")
public class Hospital {
    
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 医院编码
     */
    @TableField("hospital_code")
    private String hospitalCode;

    /**
     * 医院名称
     */
    @TableField("hospital_name")
    private String hospitalName;

    /**
     * 医院中文名称
     */
    @TableField("hospital_cname")
    private String hospitalCname;

    /**
     * 医院类型
     */
    @TableField("hospital_type")
    private String hospitalType;

    /**
     * 医院地址
     */
    private String address;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 是否启用(1:启用, 0:禁用)
     */
    @TableField("is_active")
    private Boolean isActive;

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
