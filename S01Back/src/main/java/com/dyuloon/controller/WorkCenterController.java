package com.dyuloon.controller;

import com.dyuloon.entity.dto.WorkCenterClassResponse;
import com.dyuloon.service.WorkCenterService;
import com.dyuloon.vo.ResultVO;
import com.dyuloon.util.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dyuloon.entity.SystemModule;
import java.util.List;
import java.util.Map;


/**
 * 工作中心控制器
 * 处理工作中心相关的请求
 */
@RestController
@RequestMapping("/api/workcenter")
public class WorkCenterController {
    
    @Autowired
    private WorkCenterService workCenterService;
    
    /**
     * 获取工作中心分类列表
     * GET /api/workcenter/getclass
     * 
     * @return 分类列表响应
     */
    @GetMapping("/getclass")
    public WorkCenterClassResponse getWorkCenterClass() {
        return workCenterService.getCategories();
    }

    /**
     * 根据分类名称获取模块列表
     * POST /api/workcenter/getmodulelist
     *
     * @param request 请求体，包含 "name" 字段
     * @return 模块列表
     */
    @PostMapping("/getmodulelist")
    public ResultVO<List<SystemModule>> getModuleList(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        List<SystemModule> modules = workCenterService.getModulesByName(name);
        return ResultVOUtil.success(modules, "获取模块列表成功");
    }
}
