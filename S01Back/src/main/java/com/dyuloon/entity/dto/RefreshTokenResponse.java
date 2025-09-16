package com.dyuloon.entity.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 刷新Token响应DTO
 */
@Data
public class RefreshTokenResponse {
    /**
     * 新的访问令牌
     */
    @JsonProperty("AccessToken")
    private String AccessToken;
    
    /**
     * 新的刷新令牌
     */
    @JsonProperty("RefreshToken")
    private String RefreshToken;
    
    /**
     * 过期时间（秒）
     */
    @JsonProperty("ExpiresIn")
    private Integer ExpiresIn;
}
