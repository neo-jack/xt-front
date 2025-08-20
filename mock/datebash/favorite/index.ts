// 收藏项目类型定义
export interface FavoriteItem {
  id: string;
  /** 名称 */
  name: string;
  /** 描述 */
  description: string;
  /** 图标 */
  icon: string;
  /** 端口 */
  port: number;
  /** url */
  url: string;
}

// 用户收藏数据类型定义
export interface UserFavoriteData {
  userId: number;
  favorites: FavoriteItem[];
}

// 用户收藏数据
export const userFavorites: UserFavoriteData[] = [
  {
    "userId": 1,
    "favorites": [
      {
        "id": "H01",
        "name": "报告查询",
        "description": "医疗报告查询和管理系统",
        "icon": "FileSearchOutlined",
        "port": 3001,
        "url": "http://localhost:3001"
      },
      {
        "id": "H03",
        "name": "经销商结算",
        "description": "经销商费用结算系统",
        "icon": "ShopOutlined",
        "port": 3003,
        "url": "http://localhost:3003"
      },
      {
        "id": "H05",
        "name": "转运中心",
        "description": "样本转运中心管理",
        "icon": "SendOutlined",
        "port": 3005,
        "url": "http://localhost:3005"
      },
      {
        "id": "H09",
        "name": "常规检验工作站",
        "description": "常规检验工作站管理",
        "icon": "MedicineBoxOutlined",
        "port": 3009,
        "url": "http://localhost:3009"
      },
      {
        "id": "H11",
        "name": "特检工作站",
        "description": "特殊检验工作站",
        "icon": "BugOutlined",
        "port": 3011,
        "url": "http://localhost:3011"
      },
      {
        "id": "H12",
        "name": "样本管理工作站",
        "description": "样本管理工作站系统",
        "icon": "DatabaseOutlined",
        "port": 3012,
        "url": "http://localhost:3012"
      },
      {
        "id": "H10",
        "name": "ELISA管理",
        "description": "ELISA检测管理系统",
        "icon": "RadarChartOutlined",
        "port": 3010,
        "url": "http://localhost:3010"
      }
    ]
  },
  {
    "userId": 2,
    "favorites": [
      {
        "id": "H01",
        "name": "报告查询",
        "description": "医疗报告查询和管理系统",
        "icon": "FileSearchOutlined",
        "port": 3001,
        "url": "http://localhost:3001"
      },
      {
        "id": "H03",
        "name": "经销商结算",
        "description": "经销商费用结算系统",
        "icon": "ShopOutlined",
        "port": 3003,
        "url": "http://localhost:3003"
      },
      {
        "id": "H05",
        "name": "转运中心",
        "description": "样本转运中心管理",
        "icon": "SendOutlined",
        "port": 3005,
        "url": "http://localhost:3005"
      },
      {
        "id": "H09",
        "name": "常规检验工作站",
        "description": "常规检验工作站管理",
        "icon": "MedicineBoxOutlined",
        "port": 3009,
        "url": "http://localhost:3009"
      },
      {
        "id": "H11",
        "name": "特检工作站",
        "description": "特殊检验工作站",
        "icon": "BugOutlined",
        "port": 3011,
        "url": "http://localhost:3011"
      },
      {
        "id": "H12",
        "name": "样本管理工作站",
        "description": "样本管理工作站系统",
        "icon": "DatabaseOutlined",
        "port": 3012,
        "url": "http://localhost:3012"
      }
    ]
  }
];

