package com.dyuloon.controller;

import com.dyuloon.entity.dto.FavoriteDTO;
import com.dyuloon.entity.dto.FavoriteAddRequest;
import com.dyuloon.entity.dto.FavoriteRemoveRequest;
import com.dyuloon.entity.dto.FavoriteSortRequest;
import com.dyuloon.service.FavoriteService;
import com.dyuloon.util.JwtUtil;
import com.dyuloon.vo.ResultVO;
import com.dyuloon.util.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 收藏控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 获取收藏列表
     */
    @PostMapping("/get")
    public ResultVO<List<FavoriteDTO>> getFavorites(HttpServletRequest request) {
        try {
            // 从token获取用户ID
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            List<FavoriteDTO> favorites = favoriteService.getUserFavorites(userId);
            return ResultVOUtil.success(favorites, "获取收藏列表成功");

        } catch (Exception e) {
            log.error("[FavoriteController] 获取收藏列表失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 添加收藏
     */
    @PostMapping("/add")
    public ResultVO<String> addFavorite(@RequestBody FavoriteAddRequest request, HttpServletRequest httpRequest) {
        try {
            // 从token获取用户ID
            String token = httpRequest.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            boolean success = favoriteService.addFavorite(userId, request);
            if (success) {
                return ResultVOUtil.success("添加收藏成功");
            } else {
                return ResultVOUtil.error(400, "添加收藏失败，可能已经收藏或模块不存在");
            }

        } catch (Exception e) {
            log.error("[FavoriteController] 添加收藏失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 移除收藏
     */
    @PostMapping("/remove")
    public ResultVO<String> removeFavorite(@RequestBody FavoriteRemoveRequest request, HttpServletRequest httpRequest) {
        try {
            // 从token获取用户ID
            String token = httpRequest.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            boolean success = favoriteService.removeFavorite(userId, request);
            if (success) {
                return ResultVOUtil.success("移除收藏成功");
            } else {
                return ResultVOUtil.error(400, "移除收藏失败，可能未收藏该模块");
            }

        } catch (Exception e) {
            log.error("[FavoriteController] 移除收藏失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }

    /**
     * 收藏排序
     */
    @PostMapping("/sort")
    public ResultVO<String> sortFavorites(@RequestBody FavoriteSortRequest request, HttpServletRequest httpRequest) {
        try {
            // 从token获取用户ID
            String token = httpRequest.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResultVOUtil.error(401, "缺少授权token");
            }

            token = token.substring(7); // 移除"Bearer "前缀
            Long userId = jwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ResultVOUtil.error(401, "无效的用户token");
            }

            boolean success = favoriteService.sortFavorites(userId, request);
            if (success) {
                return ResultVOUtil.success("收藏排序成功");
            } else {
                return ResultVOUtil.error(400, "收藏排序失败");
            }

        } catch (Exception e) {
            log.error("[FavoriteController] 收藏排序失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }
}
