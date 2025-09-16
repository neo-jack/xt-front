package com.dyuloon.controller;

import com.dyuloon.util.ResultVOUtil;
import com.dyuloon.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * 数据库初始化控制器
 * 用于执行数据库初始化脚本
 */
@RestController
@RequestMapping("/api/admin")
public class DatabaseInitController {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseInitController.class);
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 初始化数据库表结构
     * POST /api/admin/init-database
     */
    @PostMapping("/init-database")
    public ResultVO<Map<String, Object>> initDatabase() {
        logger.info("=== 开始初始化数据库 ===");
        
        try {
            // 读取初始化SQL脚本
            ClassPathResource resource = new ClassPathResource("db/init_database.sql");
            String sqlScript = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()), StandardCharsets.UTF_8);
            
            // 分割SQL语句并执行
            String[] sqlStatements = sqlScript.split(";");
            int executedCount = 0;
            
            for (String sql : sqlStatements) {
                sql = sql.trim();
                if (!sql.isEmpty() && !sql.startsWith("--")) {
                    try {
                        jdbcTemplate.execute(sql);
                        executedCount++;
                        logger.debug("执行SQL: {}", sql.substring(0, Math.min(50, sql.length())) + "...");
                    } catch (Exception e) {
                        logger.warn("SQL执行失败: {}", sql.substring(0, Math.min(50, sql.length())) + "...", e);
                    }
                }
            }
            
            logger.info("数据库初始化完成，执行了 {} 条SQL语句", executedCount);
            
            Map<String, Object> result = new HashMap<>();
            result.put("executedCount", executedCount);
            result.put("message", "数据库初始化完成");
            
            return ResultVOUtil.success(result, "数据库初始化成功");
            
        } catch (IOException e) {
            logger.error("读取SQL脚本失败: ", e);
            return ResultVOUtil.error(500, "读取SQL脚本失败");
        } catch (Exception e) {
            logger.error("数据库初始化失败: ", e);
            return ResultVOUtil.error(500, "数据库初始化失败");
        }
    }

    /**
     * 执行数据迁移
     * POST /api/admin/migrate-data
     */
    @PostMapping("/migrate-data")
    public ResultVO<Map<String, Object>> migrateData() {
        logger.info("=== 开始数据迁移 ===");
        
        try {
            // 读取数据迁移SQL脚本
            ClassPathResource resource = new ClassPathResource("db/data_migration.sql");
            String sqlScript = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()), StandardCharsets.UTF_8);
            
            // 分割SQL语句并执行
            String[] sqlStatements = sqlScript.split(";");
            int executedCount = 0;
            
            for (String sql : sqlStatements) {
                sql = sql.trim();
                if (!sql.isEmpty() && !sql.startsWith("--")) {
                    try {
                        jdbcTemplate.execute(sql);
                        executedCount++;
                        logger.debug("执行SQL: {}", sql.substring(0, Math.min(50, sql.length())) + "...");
                    } catch (Exception e) {
                        logger.warn("SQL执行失败: {}", sql.substring(0, Math.min(50, sql.length())) + "...", e);
                    }
                }
            }
            
            logger.info("数据迁移完成，执行了 {} 条SQL语句", executedCount);
            
            Map<String, Object> result = new HashMap<>();
            result.put("executedCount", executedCount);
            result.put("message", "数据迁移完成");
            
            return ResultVOUtil.success(result, "数据迁移成功");
            
        } catch (IOException e) {
            logger.error("读取SQL脚本失败: ", e);
            return ResultVOUtil.error(500, "读取SQL脚本失败");
        } catch (Exception e) {
            logger.error("数据迁移失败: ", e);
            return ResultVOUtil.error(500, "数据迁移失败");
        }
    }

    /**
     * 检查数据库状态
     * GET /api/admin/database-status
     */
    @GetMapping("/database-status")
    public ResultVO<Map<String, Object>> getDatabaseStatus() {
        logger.info("=== 检查数据库状态 ===");
        
        try {
            Map<String, Object> status = new HashMap<>();
            
            // 检查各表的数据量
            status.put("users", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Integer.class));
            status.put("hospitals", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM hospitals", Integer.class));
            status.put("system_modules", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM system_modules", Integer.class));
            status.put("system_menus", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM system_menus", Integer.class));
            status.put("user_favorites", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user_favorites", Integer.class));
            status.put("user_avatars", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user_avatars", Integer.class));
            status.put("system_info", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM system_info", Integer.class));
            
            logger.info("数据库状态检查完成");
            
            return ResultVOUtil.success(status, "数据库状态正常");
            
        } catch (Exception e) {
            logger.error("检查数据库状态失败: ", e);
            return ResultVOUtil.error(500, "检查数据库状态失败");
        }
    }
}
