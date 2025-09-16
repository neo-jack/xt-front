package com.dyuloon.entity.dto;

import lombok.Data;

/**
 * 刷新Token请求DTO
 */
@Data
public class RefreshTokenRequest {
    /**
     * 刷新令牌
     */
    private String refreshToken;
}
