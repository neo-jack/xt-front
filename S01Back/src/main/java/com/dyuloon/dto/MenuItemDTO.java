package com.dyuloon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.ArrayList;

/**
 * 菜单项数据传输对象
 * 支持多层级菜单结构，与前端MenuItem接口完全对应
 */
public class MenuItemDTO {
    
    @JsonProperty("SYNERGY_ID")
    private String synergyId;
    
    @JsonProperty("MENU_NO")
    private String menuNo;
    
    @JsonProperty("SUB_MENU")
    private List<MenuItemDTO> subMenu = new ArrayList<>();
    
    @JsonProperty("MENU_NAME")
    private String menuName;
    
    @JsonProperty("MENU_ICON")
    private String menuIcon;
    
    @JsonProperty("MENU_URL")
    private String menuUrl;
    
    @JsonProperty("SYS_MENU")
    private String sysMenu;
    
    @JsonProperty("PARENT_CODE")
    private String parentCode;
    
    @JsonProperty("MENU_MODULE")
    private String menuModule;
    
    @JsonProperty("MENU_SORT")
    private String menuSort;
    
    @JsonProperty("BECALL_MODULE_ID")
    private String becallModuleId;

    // 构造函数
    public MenuItemDTO() {}

    public MenuItemDTO(String menuNo, String menuName, String menuIcon) {
        this.menuNo = menuNo;
        this.menuName = menuName;
        this.menuIcon = menuIcon;
    }

    public MenuItemDTO(String synergyId, String menuNo, String menuName, String menuIcon, 
                       String menuUrl, String sysMenu, String parentCode, String menuModule,
                       String menuSort, String becallModuleId) {
        this.synergyId = synergyId;
        this.menuNo = menuNo;
        this.menuName = menuName;
        this.menuIcon = menuIcon;
        this.menuUrl = menuUrl;
        this.sysMenu = sysMenu;
        this.parentCode = parentCode;
        this.menuModule = menuModule;
        this.menuSort = menuSort;
        this.becallModuleId = becallModuleId;
    }

    // Getters and Setters
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

    public List<MenuItemDTO> getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(List<MenuItemDTO> subMenu) {
        this.subMenu = subMenu;
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
}
