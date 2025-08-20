// 收藏数据持久化存储
// 这个文件用于在mock环境中提供数据持久化能力

import type { UserFavoriteData } from './index';

// 使用全局变量来模拟持久化存储
// 在实际应用中，这里应该使用数据库或其他持久化方案
let persistentFavoriteData: UserFavoriteData[] | null = null;

/**
 * 获取持久化的收藏数据
 * 如果没有持久化数据，返回默认数据
 */
export const getPersistentFavorites = (): UserFavoriteData[] => {
  if (persistentFavoriteData !== null) {
    console.log('[FavoriteStorage] 使用持久化的收藏数据，共', persistentFavoriteData.length, '个用户');
    return persistentFavoriteData;
  }
  
  // 返回默认数据
  console.log('[FavoriteStorage] 使用默认收藏数据');
  return getDefaultFavorites();
};

/**
 * 保存收藏数据到持久化存储
 */
export const savePersistentFavorites = (data: UserFavoriteData[]): void => {
  persistentFavoriteData = JSON.parse(JSON.stringify(data)); // 深拷贝
  console.log('[FavoriteStorage] 收藏数据已保存到持久化存储，共', data.length, '个用户');
  
  // 打印每个用户的收藏数量，便于调试
  data.forEach(user => {
    console.log(`[FavoriteStorage] 用户 ${user.userId} 有 ${user.favorites.length} 个收藏`);
  });
};

/**
 * 获取默认收藏数据
 */
const getDefaultFavorites = (): UserFavoriteData[] => {
  return [
    {
      userId: 1,
      favorites: [
        { 
          id: "H01", 
          name: "报告查询",
          description: "医疗报告查询和管理系统",
          icon: "FileSearchOutlined",
          port: 3001,
          url: "http://localhost:3001"
        },
        { 
          id: "H03", 
          name: "经销商结算",
          description: "经销商费用结算系统",
          icon: "ShopOutlined",
          port: 3003,
          url: "http://localhost:3003"
        },
        { 
          id: "H05", 
          name: "转运中心",
          description: "样本转运中心管理",
          icon: "SendOutlined",
          port: 3005,
          url: "http://localhost:3005"
        },
        { 
          id: "H09", 
          name: "常规检验工作站",
          description: "常规检验工作站管理",
          icon: "MedicineBoxOutlined",
          port: 3009,
          url: "http://localhost:3009"
        },
        { 
          id: "H11", 
          name: "特检工作站",
          description: "特殊检验工作站",
          icon: "BugOutlined",
          port: 3011,
          url: "http://localhost:3011"
        },
        { 
          id: "H12", 
          name: "样本管理工作站",
          description: "样本管理工作站系统",
          icon: "DatabaseOutlined",
          port: 3012,
          url: "http://localhost:3012"
        }
      ]
    },
    {
      userId: 2,
      favorites: [
        { 
          id: "H01", 
          name: "报告查询",
          description: "医疗报告查询和管理系统",
          icon: "FileSearchOutlined",
          port: 3001,
          url: "http://localhost:3001"
        },
        { 
          id: "H03", 
          name: "经销商结算",
          description: "经销商费用结算系统",
          icon: "ShopOutlined",
          port: 3003,
          url: "http://localhost:3003"
        }
      ]
    }
  ];
};
