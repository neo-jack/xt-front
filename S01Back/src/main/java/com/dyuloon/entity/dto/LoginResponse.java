package com.dyuloon.entity.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 登录响应DTO
 */
@Data
public class LoginResponse {
    /**
     * 访问令牌
     */
    @JsonProperty("AccessToken")
    private String AccessToken;
    
    /**
     * 刷新令牌
     */
    @JsonProperty("RefreshToken")
    private String RefreshToken;
    
    /**
     * 过期时间（秒）
     */
    @JsonProperty("ExpiresIn")
    private Integer ExpiresIn;
    
    /**
     * 用户信息
     */
    @JsonProperty("USER")
    private UserInfo USER;
    
    @Data
    public static class UserInfo {
        /**
         * 用户ID
         */
        @JsonProperty("USER_ID")
        private Long USER_ID;
        
        /**
         * 用户姓名
         */
        @JsonProperty("USER_NAME")
        private String USER_NAME;
        
        /**
         * 用户头像
         */
        @JsonProperty("USER_AVATAR")
        private String USER_AVATAR;
        
        /**
         * 用户角色
         */
        @JsonProperty("USER_ROLE")
        private String USER_ROLE;
        
        /**
         * 医院名称
         */
        @JsonProperty("HOSPITAL_CNAME")
        private String HOSPITAL_CNAME;
        
        /**
         * 医院ID
         */
        @JsonProperty("HOSPITAL_ID")
        private Long HOSPITAL_ID;
    }
}
