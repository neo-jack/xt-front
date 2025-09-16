package com.dyuloon.service.impl;

import com.dyuloon.entity.WorkCenterCategory;
import com.dyuloon.entity.dto.WorkCenterClassResponse;
import com.dyuloon.mapper.WorkCenterCategoryMapper;
import com.dyuloon.mapper.SystemModuleMapper;
import com.dyuloon.service.WorkCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dyuloon.entity.SystemModule;

import java.util.ArrayList;
import java.util.List;

/**
 * 工作中心服务实现类
 */
@Service
public class WorkCenterServiceImpl implements WorkCenterService {

    @Autowired
    private WorkCenterCategoryMapper workCenterCategoryMapper;
    
    @Autowired
    private SystemModuleMapper moduleMapper;

    /**
     * 获取工作中心分类列表
     * @return 分类列表响应
     */
    @Override
    public WorkCenterClassResponse getCategories() {
        WorkCenterClassResponse response = new WorkCenterClassResponse();

        try {
            // 查询所有启用的分类
            List<WorkCenterCategory> categories = workCenterCategoryMapper.selectEnabledCategories();

            // 转换为前端需要的格式
            List<WorkCenterClassResponse.ClassItem> classItems = new ArrayList<>();
            for (WorkCenterCategory category : categories) {
                WorkCenterClassResponse.ClassItem item = new WorkCenterClassResponse.ClassItem();
                item.setId(category.getCategoryId());
                item.setName(category.getCategoryName());
                item.setIcon(category.getCategoryIcon());
                classItems.add(item);
            }

            response.setCode(0);
            response.setData(classItems);
            response.setMsg("获取分类成功");

        } catch (Exception e) {
            response.setCode(-1);
            response.setData(new ArrayList<>());
            response.setMsg("获取分类失败: " + e.getMessage());
        }

        return response;
    }

    @Override
    public List<SystemModule> getModulesByName(String name) {
        return moduleMapper.selectByCategoryName(name);
    }
}
