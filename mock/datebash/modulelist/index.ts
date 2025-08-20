
export interface SubModule {
    /** 主键 */
    id: string;
    /** 名称 */
    name: string;
    /** 描述 */
    description: string;
    /** 图标 */
    icon?: string;
    /** 端口 */
    port?: number;
    /** 项目路径 */
    projectPath?: string;
    /** 是否收藏 */
    isFavorite?: boolean;
  }
  
  export interface MenuCategory {
    /** 分类唯一标识符，通常对应文件夹名称 */
    id: string;
  
    /** 分类显示名称 */
    name: string;
  
    /** 分类键值，用于菜单选择和路由 */
    key: string;
  
    /** 分类图标名称，用于菜单展示 */
    icon: string;
  
    /** 该分类下包含的所有子模块列表 */
    subModules: SubModule[];
  }
  
  export interface FavoriteModule extends SubModule {
    /** 所属分类名称，用于标识模块来源 */
    categoryName: string;
  
    /** 收藏添加时间，ISO格式字符串 */
    addedAt: string;
  }
  
  export interface WorkCenterState {
    /** 当前选中的菜单分类键值 */
    selectedCategoryKey: string;
  
    /** 用户收藏的模块列表 */
    favoriteModules: FavoriteModule[];
  
    /** 正在运行的模块ID列表，用于状态标识和管理 */
    runningModules: string[];
  }
  
  

export const WORK_CENTER_MENUS: MenuCategory[] = [
    {
      id: '1xt-master',
      name: '主体业务',
      key: 'master',
      icon: 'AppstoreOutlined',
      subModules: [
        {
          id: 'H01',
          name: '报告查询',
          description: '医疗报告查询和管理系统',
          port: 3001,
          icon: 'FileSearchOutlined',
        },
        {
          id: 'H02',
          name: '结算管理',
          description: '医疗费用结算管理系统',
          port: 3002,
          icon: 'DollarOutlined',
        },
        {
          id: 'H03',
          name: '经销商结算',
          description: '经销商费用结算系统',
          port: 3003,
          icon: 'ShopOutlined',
        },
        {
          id: 'H04',
          name: '核酸移动',
          description: '核酸检测移动端管理',
          port: 3004,
          icon: 'MobileOutlined',
        },
        {
          id: 'H05',
          name: '转运中心',
          description: '样本转运中心管理',
          port: 3005,
          icon: 'SendOutlined',
        },
        {
          id: 'H06',
          name: '移动转运',
          description: '移动端转运管理系统',
          port: 3006,
          icon: 'CarOutlined',
        },
        {
          id: 'H07',
          name: '预处理工作站',
          description: '样本预处理工作站',
          port: 3007,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H08',
          name: '特殊预处理工作站',
          description: '特殊样本预处理工作站',
          port: 3008,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H09',
          name: '常规检验工作站',
          description: '常规检验工作站管理',
          port: 3009,
          icon: 'MedicineBoxOutlined',
        },
        {
          id: 'H10',
          name: 'ELISA管理',
          description: 'ELISA检测管理系统',
          port: 3010,
          icon: 'RadarChartOutlined',
        },
        {
          id: 'H11',
          name: '特检工作站',
          description: '特殊检验工作站',
          port: 3011,
          icon: 'BugOutlined',
        },
        {
          id: 'H12',
          name: '样本管理工作站',
          description: '样本管理工作站系统',
          port: 3012,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H13',
          name: '环境卫生',
          description: '环境卫生监测管理',
          port: 3013,
          icon: 'EnvironmentOutlined',
        },
        {
          id: 'H14',
          name: '微生物检验工作站',
          description: '微生物检验工作站',
          port: 3014,
          icon: 'BugOutlined',
        },
        {
          id: 'H15',
          name: '微生物规则',
          description: '微生物检验规则管理',
          port: 3015,
          icon: 'SettingOutlined',
        },
        {
          id: 'H16',
          name: '输血管理',
          description: '输血管理系统',
          port: 3016,
          icon: '#icon-chanpinbeijing1',
        },
      ],
    },
    {
      id: '2xt-sample',
      name: '样本管理',
      key: 'sample',
      icon: 'ExperimentOutlined',
      subModules: [
        {
          id: 'H17',
          name: 'P3样本管理',
          description: 'P3级别样本管理系统',
          port: 3101,
          icon: 'ExperimentOutlined',
        },
      ],
    },
    {
      id: '3xt-quality',
      name: '质量控制',
      key: 'quality',
      icon: 'SafetyOutlined',
      subModules: [
        {
          id: 'H18',
          name: '性能验证',
          description: '设备性能验证管理',
          port: 3201,
          icon: 'SettingOutlined',
        },
        {
          id: 'H19',
          name: '智能质控管理',
          description: '智能质控管理系统',
          port: 3202,
          icon: 'RadarChartOutlined',
        },
        {
          id: 'H20',
          name: '移动平均PBRT质控',
          description: '移动平均PBRT质控系统',
          port: 3203,
          icon: 'MobileOutlined',
        },
        {
          id: 'H21',
          name: 'EQA工作站',
          description: '室间质评工作站',
          port: 3204,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H22',
          name: '比对工作站',
          description: '检验结果比对工作站',
          port: 3205,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H23',
          name: '血糖比对工作站',
          description: '血糖检测比对工作站',
          port: 3206,
          icon: 'MedicineBoxOutlined',
        },
        {
          id: 'H24',
          name: '血气比对管理',
          description: '血气分析比对管理',
          port: 3207,
          icon: 'MedicineBoxOutlined',
        },
        {
          id: 'H25',
          name: '常规样本比对管理',
          description: '常规样本检测比对管理',
          port: 3208,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H26',
          name: 'POCT管理中心',
          description: 'POCT设备管理中心',
          port: 3209,
          icon: 'SettingOutlined',
        },
      ],
    },
    {
      id: '4xt-bi-analytics',
      name: 'BI分析',
      key: 'bi',
      icon: 'BarChartOutlined',
      subModules: [
        {
          id: 'H27',
          name: '数据清洗管理',
          description: '数据清洗和预处理管理',
          port: 3301,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H28',
          name: '智能文档',
          description: '智能文档生成和管理',
          port: 3302,
          icon: 'FileOutlined',
        },
        {
          id: 'H29',
          name: '智能报告平台',
          description: '智能报告生成平台',
          port: 3303,
          icon: 'BarChartOutlined',
        },
        {
          id: 'H30',
          name: '实验室报告中心',
          description: '实验室报告管理中心',
          port: 3304,
          icon: 'FileSearchOutlined',
        },
        {
          id: 'H31',
          name: '运营控制工作站大屏',
          description: '运营控制大屏展示',
          port: 3305,
          icon: 'MonitorOutlined',
        },
        {
          id: 'H32',
          name: 'ISO15189报告平台',
          description: 'ISO15189标准报告平台',
          port: 3306,
          icon: 'SafetyCertificateOutlined',
        },
        {
          id: 'H33',
          name: 'BI分析',
          description: '商业智能数据分析',
          port: 3307,
          icon: 'BarChartOutlined',
        },
        {
          id: 'H34',
          name: 'AUGS',
          description: '自动化指导系统',
          port: 3308,
          icon: 'RobotOutlined',
        },
        {
          id: 'H35',
          name: '质量指标管理工作站',
          description: '质量指标管理工作站',
          port: 3309,
          icon: 'SettingOutlined',
        },
        {
          id: 'H36',
          name: '质量指标统计报告归档',
          description: '质量指标统计报告归档系统',
          port: 3310,
          icon: 'FileOutlined',
        },
      ],
    },
    {
      id: '5xt-lab',
      name: '实验室管理',
      key: 'lab',
      icon: 'ExperimentOutlined',
      subModules: [
        {
          id: 'H37',
          name: '人员管理',
          description: '实验室人员管理系统',
          port: 3401,
          icon: 'UserOutlined',
        },
        {
          id: 'H38',
          name: '设备管理',
          description: '实验室设备管理系统',
          port: 3402,
          icon: 'ToolOutlined',
        },
        {
          id: 'H39',
          name: '智能排班',
          description: '实验室智能排班系统',
          port: 3403,
          icon: 'CalendarOutlined',
        },
        {
          id: 'H40',
          name: '考试管理1',
          description: '人员考试管理系统1',
          port: 3404,
          icon: 'FileTextOutlined',
        },
        {
          id: 'H41',
          name: '考试管理2',
          description: '人员考试管理系统2',
          port: 3405,
          icon: 'FileTextOutlined',
        },
        {
          id: 'H42',
          name: '阅卷管理',
          description: '考试阅卷管理系统',
          port: 3406,
          icon: 'EditOutlined',
        },
        {
          id: 'H43',
          name: '错题管理',
          description: '考试错题管理系统',
          port: 3407,
          icon: 'ExclamationCircleOutlined',
        },
        {
          id: 'H44',
          name: '档案中心',
          description: '实验室档案管理中心',
          port: 3408,
          icon: 'FileOutlined',
        },
        {
          id: 'H45',
          name: '事务管理',
          description: '实验室事务管理系统',
          port: 3409,
          icon: 'SettingOutlined',
        },
        {
          id: 'H46',
          name: '岗位事务',
          description: '岗位事务管理系统',
          port: 3410,
          icon: 'UserOutlined',
        },
        {
          id: 'H47',
          name: '实验室事务归档',
          description: '实验室事务归档系统',
          port: 3411,
          icon: 'FileOutlined',
        },
        {
          id: 'H48',
          name: '事务历史记录',
          description: '事务历史记录管理',
          port: 3412,
          icon: 'HistoryOutlined',
        },
        {
          id: 'H49',
          name: '不良事件管理',
          description: '实验室不良事件管理',
          port: 3413,
          icon: 'ExclamationCircleOutlined',
        },
        {
          id: 'H50',
          name: '温湿度管理',
          description: '实验室温湿度监控管理',
          port: 3414,
          icon: 'DashboardOutlined',
        },
        {
          id: 'H51',
          name: '物料管理',
          description: '实验室物料管理系统',
          port: 3415,
          icon: 'InboxOutlined',
        },
        {
          id: 'H52',
          name: '移动物料管理',
          description: '移动端物料管理系统',
          port: 3416,
          icon: 'MobileOutlined',
        },
        {
          id: 'H53',
          name: '文档管理',
          description: '实验室文档管理系统',
          port: 3417,
          icon: 'FileOutlined',
        },
        {
          id: 'H54',
          name: '供应商管理',
          description: '实验室供应商管理系统',
          port: 3418,
          icon: 'ShopOutlined',
        },
        {
          id: 'H55',
          name: '环境管理',
          description: '实验室环境管理系统',
          port: 3419,
          icon: 'EnvironmentOutlined',
        },
        {
          id: 'H56',
          name: '检查管理',
          description: '实验室检查管理系统',
          port: 3420,
          icon: 'AuditOutlined',
        },
        {
          id: 'H57',
          name: '检查管理',
          description: '实验室检查管理系统',
          port: 3421,
          icon: 'AuditOutlined',
        },
        {
          id: 'H58',
          name: '风险管理',
          description: '实验室风险管理系统',
          port: 3422,
          icon: 'SafetyOutlined',
        },
        {
          id: 'H59',
          name: '会议管理1',
          description: '实验室会议管理系统1',
          port: 3423,
          icon: 'TeamOutlined',
        },
        {
          id: 'H60',
          name: '会议管理2',
          description: '实验室会议管理系统2',
          port: 3424,
          icon: 'TeamOutlined',
        },
        {
          id: 'H61',
          name: '会议管理3',
          description: '实验室会议管理系统3',
          port: 3425,
          icon: 'TeamOutlined',
        },
        {
          id: 'H62',
          name: '人员评估管理',
          description: '实验室人员评估管理',
          port: 3426,
          icon: 'UserOutlined',
        },
        {
          id: 'H63',
          name: '人员自评',
          description: '实验室人员自我评估',
          port: 3427,
          icon: 'UserOutlined',
        },
        {
          id: 'H64',
          name: '专家评估',
          description: '实验室专家评估系统',
          port: 3428,
          icon: 'CrownOutlined',
        },
        {
          id: 'H65',
          name: '实验室环境管理系统',
          description: '实验室环境综合管理系统',
          port: 3429,
          icon: 'EnvironmentOutlined',
        },
      ],
    },
    {
      id: '6xt-knowledge',
      name: '知识库',
      key: 'knowledge',
      icon: 'BookOutlined',
      subModules: [
        {
          id: 'H66',
          name: '检验知识库',
          description: '医学检验知识库系统',
          port: 3601,
          icon: 'BookOutlined',
        },
      ],
    },
    {
      id: '7xt-samples-lib',
      name: '样本库',
      key: 'sampleslib',
      icon: 'DatabaseOutlined',
      subModules: [
        {
          id: 'H67',
          name: '科研访问工作站',
          description: '科研样本访问工作站',
          port: 3701,
          icon: 'DatabaseOutlined',
        },
      ],
    },
    {
      id: '8xt-outdoor',
      name: '外勤管理',
      key: 'outdoor',
      icon: 'CarOutlined',
      subModules: [
        {
          id: 'H68',
          name: '实验医生站',
          description: '实验医生工作站',
          port: 3801,
          icon: 'UserOutlined',
        },
        {
          id: 'H69',
          name: '实验护士站',
          description: '实验护士工作站',
          port: 3802,
          icon: 'UserOutlined',
        },
        {
          id: 'H70',
          name: '移动实验护士站',
          description: '移动实验护士工作站',
          port: 3803,
          icon: 'MobileOutlined',
        },
        {
          id: 'H71',
          name: '采集工作站',
          description: '样本采集工作站',
          port: 3804,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H72',
          name: '采集预约',
          description: '样本采集预约系统',
          port: 3805,
          icon: 'CalendarOutlined',
        },
      ],
    },
    {
      id: '9xt-third-party',
      name: '第三方',
      key: 'thirdparty',
      icon: 'ApiOutlined',
      subModules: [
        {
          id: 'H73',
          name: '测试模块',
          description: '第三方接口测试模块',
          port: 3901,
          icon: 'ApiOutlined',
        },
      ],
    },
    {
      id: '10xt-maintenance',
      name: '维护管理',
      key: 'maintenance',
      icon: 'ToolOutlined',
      subModules: [
        {
          id: 'H74',
          name: '系统维护管理',
          description: '系统维护管理平台',
          port: 4001,
          icon: 'ToolOutlined',
        },
        {
          id: 'H75',
          name: '系统数据管理',
          description: '系统数据管理平台',
          port: 4002,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H76',
          name: '系统数据管理',
          description: '系统数据管理平台2',
          port: 4003,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H77',
          name: '智能审核自动审核',
          description: '智能审核自动审核系统',
          port: 4004,
          icon: 'RobotOutlined',
        },
        {
          id: 'H78',
          name: '临床评分量表管理',
          description: '临床评分量表管理系统',
          port: 4005,
          icon: 'FileTextOutlined',
        },
      ],
    },
    {
      id: '11xt-designer',
      name: '设计器',
      key: 'designer',
      icon: 'DesktopOutlined',
      subModules: [
        {
          id: 'H79',
          name: '事务处理管理平台',
          description: '事务处理管理平台',
          port: 4101,
          icon: 'SettingOutlined',
        },
        {
          id: 'H80',
          name: '文档设计器',
          description: '文档设计器工具',
          port: 4102,
          icon: 'DesktopOutlined',
        },
      ],
    },
    {
      id: '12xt-safety',
      name: '生物安全',
      key: 'safety',
      icon: 'SafetyCertificateOutlined',
      subModules: [
        {
          id: 'H81',
          name: '生物安全风险评估',
          description: '生物安全风险评估系统',
          port: 4201,
          icon: 'SafetyOutlined',
        },
        {
          id: 'H82',
          name: '风险评估数据',
          description: '风险评估数据管理',
          port: 4202,
          icon: 'DatabaseOutlined',
        },
        {
          id: 'H83',
          name: '人员管理',
          description: '生物安全人员管理',
          port: 4203,
          icon: 'UserOutlined',
        },
        {
          id: 'H84',
          name: '设备管理',
          description: '生物安全设备管理',
          port: 4204,
          icon: 'ToolOutlined',
        },
        {
          id: 'H85',
          name: '考试管理',
          description: '生物安全考试管理',
          port: 4205,
          icon: 'FileTextOutlined',
        },
        {
          id: 'H86',
          name: '事务管理',
          description: '生物安全事务管理',
          port: 4206,
          icon: 'SettingOutlined',
        },
        {
          id: 'H87',
          name: '文档管理',
          description: '生物安全文档管理',
          port: 4207,
          icon: 'FileOutlined',
        },
        {
          id: 'H88',
          name: '检查管理',
          description: '生物安全检查管理',
          port: 4208,
          icon: 'AuditOutlined',
        },
        {
          id: 'H89',
          name: '管理指南',
          description: '生物安全管理指南',
          port: 4209,
          icon: 'BookOutlined',
        },
        {
          id: 'H90',
          name: '生物样本全流程',
          description: '生物样本全流程管理',
          port: 4210,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H91',
          name: '病原微生物样本',
          description: '病原微生物样本管理',
          port: 4211,
          icon: 'BugOutlined',
        },
        {
          id: 'H92',
          name: '备案实验室',
          description: '实验室备案管理',
          port: 4212,
          icon: 'ExperimentOutlined',
        },
        {
          id: 'H93',
          name: '人员评估',
          description: '生物安全人员评估',
          port: 4213,
          icon: 'UserOutlined',
        },
        {
          id: 'H94',
          name: '病原微生物实验室生物安全评估系统',
          description: '病原微生物实验室生物安全评估系统',
          port: 4214,
          icon: 'SafetyOutlined',
        },
        {
          id: 'H95',
          name: '病原微生物实验室生物安全备案系统',
          description: '病原微生物实验室生物安全备案系统',
          port: 4215,
          icon: 'SafetyCertificateOutlined',
        },
        {
          id: 'H96',
          name: '病原微生物实验室生物安全监管系统',
          description: '病原微生物实验室生物安全监管系统',
          port: 4216,
          icon: 'MonitorOutlined',
        },
      ],
    },
    {
      id: '13xt-poct',
      name: 'POCT管理',
      key: 'poct',
      icon: 'MonitorOutlined',
      subModules: [
        {
          id: 'H97',
          name: 'POCT管理委员会',
          description: 'POCT管理委员会系统',
          port: 4301,
          icon: 'TeamOutlined',
        },
        {
          id: 'H98',
          name: '项目管理',
          description: 'POCT项目管理系统',
          port: 4302,
          icon: 'SettingOutlined',
        },
        {
          id: 'H99',
          name: '质控总览',
          description: 'POCT质控总览系统',
          port: 4303,
          icon: 'MonitorOutlined',
        },
      ],
    },
  ];
  