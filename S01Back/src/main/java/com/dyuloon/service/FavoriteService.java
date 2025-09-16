package com.dyuloon.service;

import com.dyuloon.entity.dto.FavoriteDTO;
import com.dyuloon.entity.dto.FavoriteAddRequest;
import com.dyuloon.entity.dto.FavoriteRemoveRequest;
import com.dyuloon.entity.dto.FavoriteSortRequest;

import java.util.List;

/**
 * 收藏服务接口
 */
public interface FavoriteService {

    /**
     * 获取用户收藏列表
     * @param userId 用户ID
     * @return 收藏列表
     */
    List<FavoriteDTO> getUserFavorites(Long userId);

    /**
     * 添加收藏
     * @param userId 用户ID
     * @param request 添加收藏请求
     * @return 操作结果
     */
    boolean addFavorite(Long userId, FavoriteAddRequest request);

    /**
     * 移除收藏
     * @param userId 用户ID
     * @param request 移除收藏请求
     * @return 操作结果
     */
    boolean removeFavorite(Long userId, FavoriteRemoveRequest request);

    /**
     * 收藏排序
     * @param userId 用户ID
     * @param request 排序请求
     * @return 操作结果
     */
    boolean sortFavorites(Long userId, FavoriteSortRequest request);
}
