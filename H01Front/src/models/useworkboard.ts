/*
//-------------------------------------//
//           工作看板数据管理   
//             
//-------------------------------------//
*/

import { useState, useCallback, useEffect } from 'react';
import type { MenuCategory, SubModule, WorkCenterMenus } from '@/constants/workboard';
import { getClass } from '@/services/workcenter/getclass';
import { getModuleList } from '@/services/workcenter/getmodulelist';

// 工作看板状态类型
interface WorkBoardState {
  // 菜单分类列表
  categories: MenuCategory[];
  // 当前选中的分类
  selectedCategory: string | null;
  // 当前分类下的模块列表
  currentModules: SubModule[];
  // 收藏的模块列表
  favoriteModules: SubModule[];
  // 加载状态
  loading: {
    categories: boolean;
    modules: boolean;
    favorites: boolean;
  };
  // 错误状态
  error: {
    categories: string | null;
    modules: string | null;
    favorites: string | null;
  };
}

// 工作看板状态变化监听器类型
type WorkBoardStateListener = (state: WorkBoardState) => void;

/**
 * 工作看板数据管理器
 * 负责管理工作看板的所有数据操作
 */
export class WorkBoardManager {
  private static instance: WorkBoardManager;
  private listeners: Set<WorkBoardStateListener> = new Set();
  private state: WorkBoardState;

  private constructor() {
    // 初始化状态
    this.state = {
      categories: [],
      selectedCategory: null,
      currentModules: [],
      favoriteModules: [],
      loading: {
        categories: false,
        modules: false,
        favorites: false,
      },
      error: {
        categories: null,
        modules: null,
        favorites: null,
      },
    };
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): WorkBoardManager {
    if (!WorkBoardManager.instance) {
      WorkBoardManager.instance = new WorkBoardManager();
    }
    return WorkBoardManager.instance;
  }

  /**
   * 获取当前状态
   */
  public getState(): WorkBoardState {
    return { ...this.state };
  }

  /**
   * 更新状态并通知监听器
   */
  private updateState(updates: Partial<WorkBoardState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  /**
   * 通知所有监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('工作看板状态监听器执行失败:', error);
      }
    });
  }

  /**
   * 添加监听器
   */
  public addListener(listener: WorkBoardStateListener): void {
    this.listeners.add(listener);
  }

  /**
   * 移除监听器
   */
  public removeListener(listener: WorkBoardStateListener): void {
    this.listeners.delete(listener);
  }

  /**
   * 获取工作中心分类列表
   */
  public async loadCategories(): Promise<void> {
    try {
      this.updateState({
        loading: { ...this.state.loading, categories: true },
        error: { ...this.state.error, categories: null },
      });

      console.log('[WorkBoard] 开始获取工作中心分类列表');
      const response = await getClass();

      if (response.code === 0) {
        // 将 ClassItem 转换为 MenuCategory 格式
        const categories: MenuCategory[] = response.data.map(item => ({
          id: item.id,
          name: item.name,
          key: item.name.toLowerCase(),
          icon: item.icon,
          subModules: [], // 初始为空，需要单独获取
        }));

        this.updateState({
          categories,
          loading: { ...this.state.loading, categories: false },
        });

        console.log('[WorkBoard] 分类列表获取成功:', categories);
      } else {
        throw new Error(response.msg || '获取分类列表失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取分类列表失败';
      console.error('[WorkBoard] 分类列表获取失败:', error);
      
      this.updateState({
        loading: { ...this.state.loading, categories: false },
        error: { ...this.state.error, categories: errorMessage },
      });
    }
  }

  /**
   * 获取指定分类下的模块列表
   */
  public async loadModules(categoryName: string): Promise<void> {
    try {
      this.updateState({
        loading: { ...this.state.loading, modules: true },
        error: { ...this.state.error, modules: null },
        selectedCategory: categoryName,
      });

      console.log('[WorkBoard] 开始获取模块列表:', categoryName);
      const response = await getModuleList({ name: categoryName });

      if (response.code === 0) {
        // 将 ModuleItem 转换为 SubModule 格式
        const modules: SubModule[] = response.data.map(item => ({
          id: item.moduleCode, // 使用 moduleCode 作为唯一标识
          name: item.moduleName, // 使用 moduleName
          description: item.description,
          icon: item.icon,
          port: item.port,
          projectPath: item.url,
          isFavorite: false, // 默认为未收藏，后续可通过收藏API获取状态
        }));

        this.updateState({
          currentModules: modules,
          loading: { ...this.state.loading, modules: false },
        });

        console.log('[WorkBoard] 模块列表获取成功:', modules);
      } else {
        throw new Error(response.msg || '获取模块列表失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取模块列表失败';
      console.error('[WorkBoard] 模块列表获取失败:', error);
      
      this.updateState({
        loading: { ...this.state.loading, modules: false },
        error: { ...this.state.error, modules: errorMessage },
        currentModules: [],
      });
    }
  }

  /**
   * 检查模块是否已收藏
   */
  private isModuleFavorite(moduleId: string): boolean {
    return this.state.favoriteModules.some(module => module.id === moduleId);
  }

  /**
   * 添加到收藏
   */
  public async addToFavorites(module: SubModule): Promise<void> {
    try {
      // TODO: 调用收藏API
      console.log('[WorkBoard] 添加收藏:', module.name);
      
      const updatedModule = { ...module, isFavorite: true };
      const updatedFavorites = [...this.state.favoriteModules, updatedModule];
      
      // 更新当前模块列表中的收藏状态
      const updatedCurrentModules = this.state.currentModules.map(m =>
        m.id === module.id ? updatedModule : m
      );

      this.updateState({
        favoriteModules: updatedFavorites,
        currentModules: updatedCurrentModules,
      });

      // 保存到本地存储
      this.saveFavoritesToStorage(updatedFavorites);
    } catch (error) {
      console.error('[WorkBoard] 添加收藏失败:', error);
    }
  }

  /**
   * 从收藏中移除
   */
  public async removeFromFavorites(moduleId: string): Promise<void> {
    try {
      // TODO: 调用取消收藏API
      console.log('[WorkBoard] 移除收藏:', moduleId);
      
      const updatedFavorites = this.state.favoriteModules.filter(m => m.id !== moduleId);
      
      // 更新当前模块列表中的收藏状态
      const updatedCurrentModules = this.state.currentModules.map(m =>
        m.id === moduleId ? { ...m, isFavorite: false } : m
      );

      this.updateState({
        favoriteModules: updatedFavorites,
        currentModules: updatedCurrentModules,
      });

      // 保存到本地存储
      this.saveFavoritesToStorage(updatedFavorites);
    } catch (error) {
      console.error('[WorkBoard] 移除收藏失败:', error);
    }
  }

  /**
   * 加载收藏列表
   */
  public async loadFavorites(): Promise<void> {
    try {
      this.updateState({
        loading: { ...this.state.loading, favorites: true },
        error: { ...this.state.error, favorites: null },
      });

      // 从本地存储加载收藏
      const favorites = this.loadFavoritesFromStorage();
      
      // TODO: 从API获取收藏列表
      // const response = await getFavoriteList();
      
      this.updateState({
        favoriteModules: favorites,
        loading: { ...this.state.loading, favorites: false },
      });

      console.log('[WorkBoard] 收藏列表加载成功:', favorites);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '加载收藏列表失败';
      console.error('[WorkBoard] 收藏列表加载失败:', error);
      
      this.updateState({
        loading: { ...this.state.loading, favorites: false },
        error: { ...this.state.error, favorites: errorMessage },
      });
    }
  }

  /**
   * 保存收藏到本地存储
   */
  private saveFavoritesToStorage(favorites: SubModule[]): void {
    try {
      localStorage.setItem('workboard_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('[WorkBoard] 保存收藏到本地存储失败:', error);
    }
  }

  /**
   * 从本地存储加载收藏
   */
  private loadFavoritesFromStorage(): SubModule[] {
    try {
      const saved = localStorage.getItem('workboard_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('[WorkBoard] 从本地存储加载收藏失败:', error);
      return [];
    }
  }

  /**
   * 清除所有数据
   */
  public clearData(): void {
    this.updateState({
      categories: [],
      selectedCategory: null,
      currentModules: [],
      favoriteModules: [],
      loading: {
        categories: false,
        modules: false,
        favorites: false,
      },
      error: {
        categories: null,
        modules: null,
        favorites: null,
      },
    });
  }
}

// 导出单例实例
export const workBoardManager = WorkBoardManager.getInstance();

//-------------------------------------//
//            useWorkBoard Hook            
//-------------------------------------//

/**
 * React Hook版本的工作看板数据管理
 * 与WorkBoardManager同步状态
 */
const useWorkBoard = () => {
  const [state, setState] = useState<WorkBoardState>(workBoardManager.getState());

  // 监听WorkBoardManager的状态变化
  useEffect(() => {
    const listener = (newState: WorkBoardState) => {
      setState(newState);
    };

    workBoardManager.addListener(listener);

    // 同步当前状态
    setState(workBoardManager.getState());

    return () => {
      workBoardManager.removeListener(listener);
    };
  }, []);

  // 操作方法
  const operations = {
    // 加载分类列表
    loadCategories: useCallback(() => workBoardManager.loadCategories(), []),
    
    // 加载模块列表
    loadModules: useCallback((categoryName: string) => workBoardManager.loadModules(categoryName), []),
    
    // 加载收藏列表
    loadFavorites: useCallback(() => workBoardManager.loadFavorites(), []),
    
    // 添加收藏
    addToFavorites: useCallback((module: SubModule) => workBoardManager.addToFavorites(module), []),
    
    // 移除收藏
    removeFromFavorites: useCallback((moduleId: string) => workBoardManager.removeFromFavorites(moduleId), []),
    
    // 清除数据
    clearData: useCallback(() => workBoardManager.clearData(), []),
  };

  return {
    // 状态
    ...state,
    
    // 操作方法
    ...operations,
  };
};

// 导出便捷的静态访问函数
export const getWorkBoardState = () => workBoardManager.getState();
export const loadWorkBoardCategories = () => workBoardManager.loadCategories();
export const loadWorkBoardModules = (categoryName: string) => workBoardManager.loadModules(categoryName);

export default useWorkBoard;
