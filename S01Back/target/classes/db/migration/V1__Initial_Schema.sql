-- 创建用户表
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码（MD5加密）',
  `user_name` varchar(100) NOT NULL COMMENT '用户姓名',
  `user_avatar` varchar(500) DEFAULT NULL COMMENT '用户头像',
  `user_role` varchar(50) NOT NULL COMMENT '用户角色',
  `hospital_id` bigint NOT NULL COMMENT '医院ID',
  `hospital_cname` varchar(200) NOT NULL COMMENT '医院名称',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建收藏夹表
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `module_id` varchar(50) NOT NULL COMMENT '模块ID',
  `module_name` varchar(200) NOT NULL COMMENT '模块名称',
  `description` varchar(500) DEFAULT NULL COMMENT '模块描述',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `port` int DEFAULT NULL COMMENT '端口',
  `url` varchar(500) DEFAULT NULL COMMENT '访问URL',
  `sort_order` int DEFAULT 0 COMMENT '排序序号',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_module` (`user_id`, `module_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户收藏表';

-- 创建系统菜单表
CREATE TABLE IF NOT EXISTS `system_menus` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `synergy_id` varchar(100) DEFAULT NULL COMMENT '协同ID',
  `menu_no` varchar(50) NOT NULL COMMENT '菜单编号',
  `menu_name` varchar(200) NOT NULL COMMENT '菜单名称',
  `menu_icon` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `menu_url` varchar(500) DEFAULT NULL COMMENT '菜单URL',
  `sys_menu` varchar(50) DEFAULT NULL COMMENT '系统菜单',
  `parent_code` varchar(50) DEFAULT NULL COMMENT '父级代码',
  `menu_module` varchar(100) DEFAULT NULL COMMENT '菜单模块',
  `menu_sort` varchar(10) DEFAULT NULL COMMENT '菜单排序',
  `becall_module_id` varchar(100) DEFAULT NULL COMMENT '回调模块ID',
  `level` int DEFAULT 1 COMMENT '菜单层级',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_menu_no` (`menu_no`),
  KEY `idx_parent_code` (`parent_code`),
  KEY `idx_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单表';

-- 创建系统模块表
CREATE TABLE IF NOT EXISTS `system_modules` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '模块ID',
  `module_code` varchar(50) NOT NULL COMMENT '模块代码',
  `module_name` varchar(200) NOT NULL COMMENT '模块名称',
  `description` varchar(500) DEFAULT NULL COMMENT '模块描述',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `port` int DEFAULT NULL COMMENT '端口',
  `url` varchar(500) DEFAULT NULL COMMENT '访问URL',
  `status` tinyint DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_module_code` (`module_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统模块表';

-- 插入初始用户数据
INSERT INTO `users` (`username`, `password`, `user_name`, `user_avatar`, `user_role`, `hospital_id`, `hospital_cname`) VALUES
('root', '63a9f0ea7bb98050796b649e85481845', '李银', '/datebash/acators/user_1_1755766697981_emmmw.png', 'root', 1, '001省医院'),
('doctor', 'e10adc3949ba59abbe56e057f20f883e', '张医生', '/datebash/acators/user_1_1755300000001_avatar2.png', 'doctor', 1, '002省医院');

-- 插入系统模块数据
INSERT INTO `system_modules` (`module_code`, `module_name`, `description`, `icon`, `port`, `url`) VALUES
('H01', '报告查询', '医疗报告查询和管理系统', 'FileSearchOutlined', 3001, 'http://localhost:3001'),
('H03', '经销商结算', '经销商费用结算系统', 'ShopOutlined', 3003, 'http://localhost:3003'),
('H05', '转运中心', '样本转运中心管理', 'SendOutlined', 3005, 'http://localhost:3005'),
('H09', '常规检验工作站', '常规检验工作站管理', 'MedicineBoxOutlined', 3009, 'http://localhost:3009'),
('H11', '特检工作站', '特殊检验工作站', 'BugOutlined', 3011, 'http://localhost:3011'),
('H12', '样本管理工作站', '样本管理工作站系统', 'DatabaseOutlined', 3012, 'http://localhost:3012'),
('H19', '智能质控管理', '智能质控管理系统', 'RadarChartOutlined', 3202, 'http://localhost:3202'),
('H29', '智能报告平台', '智能报告生成平台', 'BarChartOutlined', 3303, 'http://localhost:3303'),
('H37', '人员管理', '实验室人员管理系统', 'UserOutlined', 3401, 'http://localhost:3401'),
('H38', '设备管理', '实验室设备管理系统', 'ToolOutlined', 3402, 'http://localhost:3402'),
('H39', '智能排班', '实验室智能排班系统', 'CalendarOutlined', 3403, 'http://localhost:3403'),
('H40', '考试管理1', '人员考试管理系统1', 'FileTextOutlined', 3404, 'http://localhost:3404'),
('H44', '档案中心', '实验室档案管理中心', 'FileOutlined', 3408, 'http://localhost:3408'),
('H45', '事务管理', '实验室事务管理系统', 'SettingOutlined', 3409, 'http://localhost:3409'),
('H49', '不良事件管理', '实验室不良事件管理', 'ExclamationCircleOutlined', 3413, 'http://localhost:3413'),
('H50', '温湿度管理', '实验室温湿度监控管理', 'DashboardOutlined', 3414, 'http://localhost:3414'),
('H51', '物料管理', '实验室物料管理系统', 'InboxOutlined', 3415, 'http://localhost:3415'),
('H53', '文档管理', '实验室文档管理系统', 'FileOutlined', 3417, 'http://localhost:3417'),
('H54', '供应商管理', '实验室供应商管理系统', 'ShopOutlined', 3418, 'http://localhost:3418'),
('H56', '检查管理', '实验室检查管理系统', 'AuditOutlined', 3420, 'http://localhost:3420'),
('H59', '会议管理1', '实验室会议管理系统1', 'TeamOutlined', 3423, 'http://localhost:3423'),
('H62', '人员评估管理', '实验室人员评估管理', 'UserOutlined', 3426, 'http://localhost:3426'),
('H74', '系统维护管理', '系统维护管理平台', 'ToolOutlined', 4001, 'http://localhost:4001'),
('H75', '系统数据管理', '系统数据管理平台', 'DatabaseOutlined', 4002, 'http://localhost:4002'),
('H77', '智能审核自动审核', '智能审核自动审核系统', 'RobotOutlined', 4004, 'http://localhost:4004');

-- 插入用户1的收藏数据
INSERT INTO `favorites` (`user_id`, `module_id`, `module_name`, `description`, `icon`, `port`, `url`, `sort_order`) VALUES
(1, 'H01', '报告查询', '医疗报告查询和管理系统', 'FileSearchOutlined', 3001, 'http://localhost:3001', 1),
(1, 'H54', '供应商管理', '实验室供应商管理系统', 'ShopOutlined', 3418, 'http://localhost:3418', 2),
(1, 'H38', '设备管理', '实验室设备管理系统', 'ToolOutlined', 3402, 'http://localhost:3402', 3),
(1, 'H37', '人员管理', '实验室人员管理系统', 'UserOutlined', 3401, 'http://localhost:3401', 4),
(1, 'H53', '文档管理', '实验室文档管理系统', 'FileOutlined', 3417, 'http://localhost:3417', 5),
(1, 'H45', '事务管理', '实验室事务管理系统', 'SettingOutlined', 3409, 'http://localhost:3409', 6),
(1, 'H40', '考试管理1', '人员考试管理系统1', 'FileTextOutlined', 3404, 'http://localhost:3404', 7),
(1, 'H44', '档案中心', '实验室档案管理中心', 'FileOutlined', 3408, 'http://localhost:3408', 8),
(1, 'H59', '会议管理1', '实验室会议管理系统1', 'TeamOutlined', 3423, 'http://localhost:3423', 9),
(1, 'H62', '人员评估管理', '实验室人员评估管理', 'UserOutlined', 3426, 'http://localhost:3426', 10),
(1, 'H50', '温湿度管理', '实验室温湿度监控管理', 'DashboardOutlined', 3414, 'http://localhost:3414', 11),
(1, 'H56', '检查管理', '实验室检查管理系统', 'AuditOutlined', 3420, 'http://localhost:3420', 12),
(1, 'H39', '智能排班', '实验室智能排班系统', 'CalendarOutlined', 3403, 'http://localhost:3403', 13),
(1, 'H75', '系统数据管理', '系统数据管理平台', 'DatabaseOutlined', 4002, 'http://localhost:4002', 14),
(1, 'H74', '系统维护管理', '系统维护管理平台', 'ToolOutlined', 4001, 'http://localhost:4001', 15),
(1, 'H77', '智能审核自动审核', '智能审核自动审核系统', 'RobotOutlined', 4004, 'http://localhost:4004', 16),
(1, 'H51', '物料管理', '实验室物料管理系统', 'InboxOutlined', 3415, 'http://localhost:3415', 17),
(1, 'H29', '智能报告平台', '智能报告生成平台', 'BarChartOutlined', 3303, 'http://localhost:3303', 18),
(1, 'H49', '不良事件管理', '实验室不良事件管理', 'ExclamationCircleOutlined', 3413, 'http://localhost:3413', 19),
(1, 'H19', '智能质控管理', '智能质控管理系统', 'RadarChartOutlined', 3202, 'http://localhost:3202', 20);

-- 插入用户2的收藏数据
INSERT INTO `favorites` (`user_id`, `module_id`, `module_name`, `description`, `icon`, `port`, `url`, `sort_order`) VALUES
(2, 'H01', '报告查询', '医疗报告查询和管理系统', 'FileSearchOutlined', 3001, 'http://localhost:3001', 1),
(2, 'H03', '经销商结算', '经销商费用结算系统', 'ShopOutlined', 3003, 'http://localhost:3003', 2),
(2, 'H05', '转运中心', '样本转运中心管理', 'SendOutlined', 3005, 'http://localhost:3005', 3),
(2, 'H09', '常规检验工作站', '常规检验工作站管理', 'MedicineBoxOutlined', 3009, 'http://localhost:3009', 4),
(2, 'H11', '特检工作站', '特殊检验工作站', 'BugOutlined', 3011, 'http://localhost:3011', 5),
(2, 'H12', '样本管理工作站', '样本管理工作站系统', 'DatabaseOutlined', 3012, 'http://localhost:3012', 6);

-- 插入系统菜单数据（基于Data(数据库信息参考)/H01Frontend/system_menus.json）
INSERT INTO `system_menus` (`id`, `user_id`, `synergy_id`, `menu_no`, `menu_name`, `menu_icon`, `menu_url`, `sys_menu`, `parent_code`, `menu_module`, `menu_sort`, `becall_module_id`, `level`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'H5701', '工作看板', 'DashboardOutlined', '/xt/workboard', 'H57', 'H57', NULL, '01', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(2, 1, NULL, 'H5705', '工作中台', 'AppstoreOutlined', '/xt/workcenter', 'H57', 'H57', NULL, '02', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(3, 1, NULL, 'H5717', '智能工作台', 'icon-liaotian', NULL, 'H57', 'H57', NULL, '04', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(4, 1, NULL, 'H5704', '即时通讯', 'MessageOutlined', '/xt/im', 'H57', 'H57', NULL, '05', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(5, 1, NULL, 'H5720', '科室通知', 'NotificationOutlined', '/xt/department-notice', 'H57', 'H57', NULL, '20', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(6, 1, NULL, 'H5721', '事务流程', 'ApartmentOutlined', 'https://localhost:18028/xt/workflow', 'H57', 'H57', NULL, '21', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(7, 1, NULL, 'H5722', 'AI智能助手', 'RobotOutlined', 'https://localhost:18029/xt/ai-assistant', 'H57', 'H57', NULL, '22', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(8, 2, NULL, 'H5701', '工作看板', 'DashboardOutlined', '/xt/workboard', 'H57', 'H57', NULL, '01', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(9, 2, NULL, 'H5705', '工作中台', 'AppstoreOutlined', '/xt/workcenter', 'H57', 'H57', NULL, '02', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(10, 2, NULL, 'H5704', '即时通讯', 'MessageOutlined', '/xt/im', 'H57', 'H57', NULL, '05', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40'),
(11, 2, NULL, 'H5720', '科室通知', 'NotificationOutlined', '/xt/department-notice', 'H57', 'H57', NULL, '20', NULL, 1, '2025-09-15 16:36:40', '2025-09-15 16:36:40');
