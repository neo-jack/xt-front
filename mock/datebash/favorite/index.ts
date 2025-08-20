// 收藏项目类型定义
export interface FavoriteItem {
  id: string;
  name: string;
}

// 用户收藏数据类型定义
export interface UserFavoriteData {
  userId: number;
  favorites: FavoriteItem[];
}

// 用户收藏数据
export const userFavorites: UserFavoriteData[] = [
  {
    userId: 1,
    favorites: [
      { id: "H01", name: "报告查询" },
      { id: "H03", name: "经销商结算" },
      { id: "H05", name: "转运中心" },
      { id: "H09", name: "常规检验工作站" },
      { id: "H11", name: "特检工作站" },
      { id: "H12", name: "样本管理工作站" }
    ]
  },
  {
    userId: 2,
    favorites: [
      { id: "H01", name: "报告查询" },
      { id: "H03", name: "经销商结算" },
      { id: "H05", name: "转运中心" },
      { id: "H09", name: "常规检验工作站" },
      { id: "H11", name: "特检工作站" },
      { id: "H12", name: "样本管理工作站" }
    ]
  }
];

// 兼容旧格式的数据结构
export interface FavoriteData {
  usrid: number;
  user_favorites: string;
}

// 兼容旧API的数据格式
export const favorite: FavoriteData[] = userFavorites.map(user => ({
  usrid: user.userId,
  user_favorites: JSON.stringify(user.favorites)
}));