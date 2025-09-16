package com.dyuloon.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户实体类
 */
@Data
@TableName("users")
public class User {
    
    /**
     * 用户ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码（MD5加密）
     */
    private String password;

    /**
     * 用户姓名
     */
    @TableField("user_name")
    private String userName;

    /**
     * 用户头像
     */
    @TableField("user_avatar")
    private String userAvatar;

    /**
     * 用户角色
     */
    @TableField("user_role")
    private String userRole;

    /**
     * 医院ID
     */
    @TableField("hospital_id")
    private Long hospitalId;

    /**
     * 医院名称
     */
    @TableField("hospital_cname")
    private String hospitalCname;

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
    
    // 手动添加getter方法以解决Lombok编译问题
    public String getUserName() {
        return userName;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getUserRole() {
        return userRole;
    }
    
    public String getUserAvatar() {
        return userAvatar;
    }
    
    public String getHospitalCname() {
        return hospitalCname;
    }
    
    public Long getHospitalId() {
        return hospitalId;
    }
    
    public String getPassword() {
        return password;
    }
    
    public Long getId() {
        return id;
    }
}
