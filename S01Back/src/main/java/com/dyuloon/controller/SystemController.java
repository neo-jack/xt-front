package com.dyuloon.controller;

import com.dyuloon.vo.ResultVO;
import com.dyuloon.util.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 系统信息控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/system")
public class SystemController {

    /**
     * 获取系统信息
     */
    @PostMapping("/info")
    public ResultVO<Map<String, Object>> getSystemInfo() {
        try {
            Map<String, Object> systemInfo = new HashMap<>();
            systemInfo.put("systemName", "医院管理系统");
            systemInfo.put("version", "1.0.0");
            systemInfo.put("author", "H01医院系统");
            systemInfo.put("description", "基于Spring Boot的医院管理系统");
            
            return ResultVOUtil.success(systemInfo, "获取系统信息成功");
        } catch (Exception e) {
            log.error("[SystemController] 获取系统信息失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }
}
