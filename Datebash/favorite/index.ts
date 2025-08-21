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
  /** 排序 */
  sort?: number;
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
        "url": "http://localhost:3001",
        "sort": 1
      },
      {
        "id": "H54",
        "name": "供应商管理",
        "description": "实验室供应商管理系统",
        "icon": "ShopOutlined",
        "port": 3418,
        "url": "http://localhost:3418",
        "sort": 2
      },
      {
        "id": "H38",
        "name": "设备管理",
        "description": "实验室设备管理系统",
        "icon": "ToolOutlined",
        "port": 3402,
        "url": "http://localhost:3402",
        "sort": 3
      },
      {
        "id": "H37",
        "name": "人员管理",
        "description": "实验室人员管理系统",
        "icon": "UserOutlined",
        "port": 3401,
        "url": "http://localhost:3401",
        "sort": 4
      },
      {
        "id": "H53",
        "name": "文档管理",
        "description": "实验室文档管理系统",
        "icon": "FileOutlined",
        "port": 3417,
        "url": "http://localhost:3417",
        "sort": 5
      },
      {
        "id": "H45",
        "name": "事务管理",
        "description": "实验室事务管理系统",
        "icon": "SettingOutlined",
        "port": 3409,
        "url": "http://localhost:3409",
        "sort": 6
      },
      {
        "id": "H40",
        "name": "考试管理1",
        "description": "人员考试管理系统1",
        "icon": "FileTextOutlined",
        "port": 3404,
        "url": "http://localhost:3404",
        "sort": 7
      },
      {
        "id": "H44",
        "name": "档案中心",
        "description": "实验室档案管理中心",
        "icon": "FileOutlined",
        "port": 3408,
        "url": "http://localhost:3408",
        "sort": 8
      },
      {
        "id": "H59",
        "name": "会议管理1",
        "description": "实验室会议管理系统1",
        "icon": "TeamOutlined",
        "port": 3423,
        "url": "http://localhost:3423",
        "sort": 9
      },
      {
        "id": "H62",
        "name": "人员评估管理",
        "description": "实验室人员评估管理",
        "icon": "UserOutlined",
        "port": 3426,
        "url": "http://localhost:3426",
        "sort": 10
      },
      {
        "id": "H50",
        "name": "温湿度管理",
        "description": "实验室温湿度监控管理",
        "icon": "DashboardOutlined",
        "port": 3414,
        "url": "http://localhost:3414",
        "sort": 11
      },
      {
        "id": "H56",
        "name": "检查管理",
        "description": "实验室检查管理系统",
        "icon": "AuditOutlined",
        "port": 3420,
        "url": "http://localhost:3420",
        "sort": 12
      },
      {
        "id": "H39",
        "name": "智能排班",
        "description": "实验室智能排班系统",
        "icon": "CalendarOutlined",
        "port": 3403,
        "url": "http://localhost:3403",
        "sort": 13
      },
      {
        "id": "H75",
        "name": "系统数据管理",
        "description": "系统数据管理平台",
        "icon": "DatabaseOutlined",
        "port": 4002,
        "url": "http://localhost:4002",
        "sort": 14
      },
      {
        "id": "H74",
        "name": "系统维护管理",
        "description": "系统维护管理平台",
        "icon": "ToolOutlined",
        "port": 4001,
        "url": "http://localhost:4001",
        "sort": 15
      },
      {
        "id": "H77",
        "name": "智能审核自动审核",
        "description": "智能审核自动审核系统",
        "icon": "RobotOutlined",
        "port": 4004,
        "url": "http://localhost:4004",
        "sort": 16
      },
      {
        "id": "H51",
        "name": "物料管理",
        "description": "实验室物料管理系统",
        "icon": "InboxOutlined",
        "port": 3415,
        "url": "http://localhost:3415",
        "sort": 17
      },
      {
        "id": "H29",
        "name": "智能报告平台",
        "description": "智能报告生成平台",
        "icon": "BarChartOutlined",
        "port": 3303,
        "url": "http://localhost:3303",
        "sort": 18
      },
      {
        "id": "H49",
        "name": "不良事件管理",
        "description": "实验室不良事件管理",
        "icon": "ExclamationCircleOutlined",
        "port": 3413,
        "url": "http://localhost:3413",
        "sort": 19
      },
      {
        "id": "H19",
        "name": "智能质控管理",
        "description": "智能质控管理系统",
        "icon": "RadarChartOutlined",
        "port": 3202,
        "url": "http://localhost:3202",
        "sort": 20
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
        "url": "http://localhost:3001",
        "sort": 1
      },
      {
        "id": "H03",
        "name": "经销商结算",
        "description": "经销商费用结算系统",
        "icon": "ShopOutlined",
        "port": 3003,
        "url": "http://localhost:3003",
        "sort": 2
      },
      {
        "id": "H05",
        "name": "转运中心",
        "description": "样本转运中心管理",
        "icon": "SendOutlined",
        "port": 3005,
        "url": "http://localhost:3005",
        "sort": 3
      },
      {
        "id": "H09",
        "name": "常规检验工作站",
        "description": "常规检验工作站管理",
        "icon": "MedicineBoxOutlined",
        "port": 3009,
        "url": "http://localhost:3009",
        "sort": 4
      },
      {
        "id": "H11",
        "name": "特检工作站",
        "description": "特殊检验工作站",
        "icon": "BugOutlined",
        "port": 3011,
        "url": "http://localhost:3011",
        "sort": 5
      },
      {
        "id": "H12",
        "name": "样本管理工作站",
        "description": "样本管理工作站系统",
        "icon": "DatabaseOutlined",
        "port": 3012,
        "url": "http://localhost:3012",
        "sort": 6
      }
    ]
  }
];

