package com.dyuloon.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JWT工具类
 */
@Component
public class JwtUtil {
    
    // JWT密钥 - 开发环境使用固定密钥，生产环境应该使用环境变量
    private static final String DEV_SECRET = "your_secret_key_here_for_development_environment_only_replace_in_production";
    private static final SecretKey SECRET_KEY;
    
    static {
        try {
            // 确保密钥长度足够（至少256位）
            byte[] keyBytes = DEV_SECRET.getBytes("UTF-8");
            if (keyBytes.length < 32) {
                // 如果密钥太短，使用SHA-256哈希来生成固定长度的密钥
                java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
                keyBytes = md.digest(keyBytes);
            }
            SECRET_KEY = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize JWT secret key", e);
        }
    }
    
    // Access Token过期时间 (1小时)
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 60 * 60 * 1000;
    
    // Refresh Token过期时间 (24小时)
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 24 * 60 * 60 * 1000;

    /**
     * 生成access token
     */
    public String generateToken(String username, String role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("role", role);
        claims.put("userId", userId);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 生成refresh token
     */
    public String generateRefreshToken(String username, String role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("role", role);
        claims.put("userId", userId);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 验证token
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 从token中获取Claims
     */
    public Claims getClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从token中获取用户名
     */
    public String getUsernameFromToken(String token) {
        Claims claims = getClaims(token);
        return claims != null ? claims.getSubject() : null;
    }

    /**
     * 从token中获取角色
     */
    public String getRoleFromToken(String token) {
        Claims claims = getClaims(token);
        return claims != null ? (String) claims.get("role") : null;
    }

    /**
     * 从token中获取用户ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return claims != null ? Long.valueOf(claims.get("userId").toString()) : null;
    }

    /**
     * 检查token是否过期
     */
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaims(token);
            return claims == null || claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * 从Authorization header中提取token
     */
    public String extractTokenFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
