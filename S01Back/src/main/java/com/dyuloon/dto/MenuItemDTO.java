package com.dyuloon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 菜单项数据传输对象
 * 参考前端 getclass 服务的数据结构
 */
public class MenuItemDTO {
    
    private String id;
    private String name;
    private String icon;
    private String url;
    
    @JsonProperty("menu_no")
    private String menuNo;
    
    @JsonProperty("sys_menu")
    private String sysMenu;
    
    @JsonProperty("parent_code")
    private String parentCode;
    
    @JsonProperty("menu_sort")
    private String menuSort;
    
    private Integer level;

    // 构造函数
    public MenuItemDTO() {}

    public MenuItemDTO(String id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    public MenuItemDTO(String id, String name, String icon, String url, String menuNo, 
                       String sysMenu, String parentCode, String menuSort, Integer level) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.menuNo = menuNo;
        this.sysMenu = sysMenu;
        this.parentCode = parentCode;
        this.menuSort = menuSort;
        this.level = level;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMenuNo() {
        return menuNo;
    }

    public void setMenuNo(String menuNo) {
        this.menuNo = menuNo;
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

    public String getMenuSort() {
        return menuSort;
    }

    public void setMenuSort(String menuSort) {
        this.menuSort = menuSort;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
