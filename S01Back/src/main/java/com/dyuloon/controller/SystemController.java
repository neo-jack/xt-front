package com.dyuloon.controller;

import com.dyuloon.entity.SystemInfo;
import com.dyuloon.service.SystemInfoService;
import com.dyuloon.vo.ResultVO;
import com.dyuloon.util.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private SystemInfoService systemInfoService;

    /**
     * 获取系统信息
     */
    @GetMapping("/info")
    public ResultVO<Map<String, Object>> getSystemInfo() {
        try {
            // 从数据库获取系统信息
            SystemInfo systemInfo = systemInfoService.getCurrentSystemInfo();
            
            Map<String, Object> result = new HashMap<>();
            if (systemInfo != null) {
                // 使用数据库中的真实数据
                result.put("clientip", systemInfo.getClientIp());
                result.put("servedomain", systemInfo.getServerDomain());
                result.put("version", systemInfo.getVersion());
                result.put("major", systemInfo.getMajorVersion());
            } else {
                // 如果数据库中没有数据，返回默认值
                result.put("clientip", "localhost");
                result.put("servedomain", "localhost");
                result.put("version", "1.0.0");
                result.put("major", 1);
            }
            
            return ResultVOUtil.success(result, "获取系统信息成功");
        } catch (Exception e) {
            log.error("[SystemController] 获取系统信息失败: {}", e.getMessage(), e);
            return ResultVOUtil.error(500, "服务器内部错误");
        }
    }
}
