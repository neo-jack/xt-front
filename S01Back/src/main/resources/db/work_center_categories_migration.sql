-- 工作中心分类表创建和数据迁移
-- 从 Datebash/modulelist/index.ts 中的 WORK_CENTER_MENUS 迁移数据

-- 创建工作中心分类表
CREATE TABLE IF NOT EXISTS `work_center_categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    `category_id` VARCHAR(50) NOT NULL COMMENT '分类标识符',
    `category_name` VARCHAR(100) NOT NULL COMMENT '分类名称',
    `category_icon` VARCHAR(50) NOT NULL COMMENT '分类图标',
    `category_key` VARCHAR(50) NOT NULL COMMENT '分类键值',
    `sort_order` INT DEFAULT 0 COMMENT '排序号',
    `status` TINYINT DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY `uk_category_id` (`category_id`),
    KEY `idx_status_sort` (`status`, `sort_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '工作中心分类表';

-- 插入分类数据 (基于 WORK_CENTER_MENUS)
INSERT INTO
    `work_center_categories` (
        `category_id`,
        `category_name`,
        `category_icon`,
        `category_key`,
        `sort_order`,
        `status`
    )
VALUES
    -- 1. 主体业务
    (
        '1xt-master',
        '主体业务',
        'AppstoreOutlined',
        'master',
        1,
        1
    ),

-- 2. 样本管理
( '2xt-sample', '样本管理', 'ExperimentOutlined', 'sample', 2, 1 ),

-- 3. 质量控制
( '3xt-quality', '质量控制', 'SafetyOutlined', 'quality', 3, 1 ),

-- 4. BI分析
( '4xt-bi-analytics', 'BI分析', 'BarChartOutlined', 'bi', 4, 1 ),

-- 5. 实验室管理
( '5xt-lab', '实验室管理', 'ExperimentOutlined', 'lab', 5, 1 ),

-- 6. 知识库
( '6xt-knowledge', '知识库', 'BookOutlined', 'knowledge', 6, 1 ),

-- 7. 样本库
( '7xt-samples-lib', '样本库', 'DatabaseOutlined', 'sampleslib', 7, 1 ),

-- 8. 外勤管理
( '8xt-outdoor', '外勤管理', 'CarOutlined', 'outdoor', 8, 1 ),

-- 9. 第三方
( '9xt-third-party', '第三方', 'ApiOutlined', 'thirdparty', 9, 1 ),

-- 10. 维护管理
( '10xt-maintenance', '维护管理', 'ToolOutlined', 'maintenance', 10, 1 ),

-- 11. 设计器
( '11xt-designer', '设计器', 'DesktopOutlined', 'designer', 11, 1 ),

-- 12. 生物安全
(
    '12xt-safety',
    '生物安全',
    'SafetyCertificateOutlined',
    'safety',
    12,
    1
),

-- 13. POCT管理
(
    '13xt-poct',
    'POCT管理',
    'MonitorOutlined',
    'poct',
    13,
    1
)
ON DUPLICATE KEY UPDATE
    `category_name` = VALUES(`category_name`),
    `category_icon` = VALUES(`category_icon`),
    `category_key` = VALUES(`category_key`),
    `sort_order` = VALUES(`sort_order`),
    `updated_at` = CURRENT_TIMESTAMP;

-- 验证数据插入
SELECT
    category_id,
    category_name,
    category_icon,
    category_key,
    sort_order,
    status
FROM work_center_categories
ORDER BY sort_order ASC;