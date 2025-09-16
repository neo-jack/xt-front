package com.dyuloon.service.impl;

import com.dyuloon.entity.Favorite;
import com.dyuloon.entity.SystemModule;
import com.dyuloon.entity.dto.FavoriteDTO;
import com.dyuloon.entity.dto.FavoriteAddRequest;
import com.dyuloon.entity.dto.FavoriteRemoveRequest;
import com.dyuloon.entity.dto.FavoriteSortRequest;
import com.dyuloon.mapper.FavoriteMapper;
import com.dyuloon.mapper.SystemModuleMapper;
import com.dyuloon.service.FavoriteService;
import com.dyuloon.service.RedisService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 收藏服务实现类
 */
@Slf4j
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Autowired
    private SystemModuleMapper systemModuleMapper;

    @Autowired
    private RedisService redisService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String FAVORITE_CACHE_PREFIX = "user_favorites:";
    private static final long CACHE_EXPIRE_HOURS = 24;

    @Override
    public List<FavoriteDTO> getUserFavorites(Long userId) {
        log.info("[FavoriteService] 获取用户{}的收藏列表", userId);

        // 先从缓存获取
        String cacheKey = FAVORITE_CACHE_PREFIX + userId;
        try {
            Object cached = redisService.get(cacheKey);
            if (cached != null) {
                log.info("[FavoriteService] 从缓存获取到用户{}的收藏列表", userId);
                return objectMapper.convertValue(cached, new TypeReference<List<FavoriteDTO>>() {});
            }
        } catch (Exception e) {
            log.warn("[FavoriteService] 从缓存获取收藏列表失败: {}", e.getMessage());
        }

        // 从数据库获取
        List<Favorite> favorites = favoriteMapper.selectByUserIdOrderBySort(userId);
        List<FavoriteDTO> result = new ArrayList<>();

        for (Favorite favorite : favorites) {
            FavoriteDTO dto = new FavoriteDTO();
            dto.setId(favorite.getModuleId());
            dto.setName(favorite.getModuleName());
            dto.setDescription(favorite.getDescription());
            dto.setIcon(favorite.getIcon());
            dto.setPort(favorite.getPort());
            dto.setUrl(favorite.getUrl());
            dto.setSort(favorite.getSortOrder());
            result.add(dto);
        }

        // 保存到缓存
        try {
            redisService.set(cacheKey, result, CACHE_EXPIRE_HOURS, TimeUnit.HOURS);
            log.info("[FavoriteService] 收藏列表已缓存，用户ID: {}", userId);
        } catch (Exception e) {
            log.warn("[FavoriteService] 缓存收藏列表失败: {}", e.getMessage());
        }

        log.info("[FavoriteService] 用户{}获取到{}个收藏", userId, result.size());
        return result;
    }

    @Override
    @Transactional
    public boolean addFavorite(Long userId, FavoriteAddRequest request) {
        log.info("[FavoriteService] 用户{}添加收藏: {}", userId, request.getId());

        try {
            // 检查是否已经收藏
            Favorite existing = favoriteMapper.selectByUserIdAndModuleId(userId, request.getId());
            if (existing != null) {
                log.warn("[FavoriteService] 用户{}已收藏模块{}", userId, request.getId());
                return false;
            }

            // 验证模块是否存在
            SystemModule module = systemModuleMapper.selectByModuleCode(request.getId());
            if (module == null) {
                log.warn("[FavoriteService] 模块{}不存在", request.getId());
                return false;
            }

            // 获取下一个排序号
            Integer maxSort = favoriteMapper.selectMaxSortOrderByUserId(userId);
            int nextSort = (maxSort != null ? maxSort : 0) + 1;

            // 创建收藏记录
            Favorite favorite = new Favorite();
            favorite.setUserId(userId);
            favorite.setModuleId(request.getId());
            favorite.setModuleName(request.getName());
            favorite.setDescription(request.getDescription());
            favorite.setIcon(request.getIcon());
            favorite.setPort(request.getPort());
            favorite.setUrl(request.getUrl());
            favorite.setSortOrder(nextSort);
            favorite.setCreatedAt(LocalDateTime.now());
            favorite.setUpdatedAt(LocalDateTime.now());

            int result = favoriteMapper.insert(favorite);

            // 清除缓存
            clearUserFavoriteCache(userId);

            log.info("[FavoriteService] 用户{}添加收藏{}成功", userId, request.getId());
            return result > 0;

        } catch (Exception e) {
            log.error("[FavoriteService] 添加收藏失败: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    @Transactional
    public boolean removeFavorite(Long userId, FavoriteRemoveRequest request) {
        log.info("[FavoriteService] 用户{}移除收藏: {}", userId, request.getId());

        try {
            // 检查收藏是否存在
            Favorite existing = favoriteMapper.selectByUserIdAndModuleId(userId, request.getId());
            if (existing == null) {
                log.warn("[FavoriteService] 用户{}未收藏模块{}", userId, request.getId());
                return false;
            }

            // 删除收藏记录
            int result = favoriteMapper.deleteById(existing.getId());

            // 清除缓存
            clearUserFavoriteCache(userId);

            log.info("[FavoriteService] 用户{}移除收藏{}成功", userId, request.getId());
            return result > 0;

        } catch (Exception e) {
            log.error("[FavoriteService] 移除收藏失败: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    @Transactional
    public boolean sortFavorites(Long userId, FavoriteSortRequest request) {
        log.info("[FavoriteService] 用户{}收藏排序，项目数: {}", userId, request.getSortItems().size());

        try {
            // 批量更新排序
            for (FavoriteSortRequest.SortItem item : request.getSortItems()) {
                favoriteMapper.updateSortOrder(userId, item.getId(), item.getSort());
            }

            // 清除缓存
            clearUserFavoriteCache(userId);

            log.info("[FavoriteService] 用户{}收藏排序成功", userId);
            return true;

        } catch (Exception e) {
            log.error("[FavoriteService] 收藏排序失败: {}", e.getMessage(), e);
            return false;
        }
    }

    /**
     * 清除用户收藏缓存
     */
    private void clearUserFavoriteCache(Long userId) {
        try {
            String cacheKey = FAVORITE_CACHE_PREFIX + userId;
            redisService.delete(cacheKey);
            log.info("[FavoriteService] 清除用户{}收藏缓存", userId);
        } catch (Exception e) {
            log.warn("[FavoriteService] 清除缓存失败: {}", e.getMessage());
        }
    }
}
