package com.dyuloon.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 系统菜单实体类
 */
public class SystemMenu {
    
    private Long id;
    
    @JsonProperty("user_id")
    private Long userId;
    
    @JsonProperty("synergy_id")
    private String synergyId;
    
    @JsonProperty("menu_no")
    private String menuNo;
    
    @JsonProperty("menu_name")
    private String menuName;
    
    @JsonProperty("menu_icon")
    private String menuIcon;
    
    @JsonProperty("menu_url")
    private String menuUrl;
    
    @JsonProperty("sys_menu")
    private String sysMenu;
    
    @JsonProperty("parent_code")
    private String parentCode;
    
    @JsonProperty("menu_module")
    private String menuModule;
    
    @JsonProperty("menu_sort")
    private String menuSort;
    
    @JsonProperty("becall_module_id")
    private String becallModuleId;
    
    private Integer level;
    
    @JsonProperty("created_at")
    private String createdAt;
    
    @JsonProperty("updated_at")
    private String updatedAt;

    // 构造函数
    public SystemMenu() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSynergyId() {
        return synergyId;
    }

    public void setSynergyId(String synergyId) {
        this.synergyId = synergyId;
    }

    public String getMenuNo() {
        return menuNo;
    }

    public void setMenuNo(String menuNo) {
        this.menuNo = menuNo;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(String menuIcon) {
        this.menuIcon = menuIcon;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public String getSysMenu() {
        return sysMenu;
    }

    public void setSysMenu(String sysMenu) {
        this.sysMenu = sysMenu;
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public String getMenuModule() {
        return menuModule;
    }

    public void setMenuModule(String menuModule) {
        this.menuModule = menuModule;
    }

    public String getMenuSort() {
        return menuSort;
    }

    public void setMenuSort(String menuSort) {
        this.menuSort = menuSort;
    }

    public String getBecallModuleId() {
        return becallModuleId;
    }

    public void setBecallModuleId(String becallModuleId) {
        this.becallModuleId = becallModuleId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}