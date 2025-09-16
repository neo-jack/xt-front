package com.dyuloon.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dyuloon.entity.Hospital;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 医院信息Mapper接口
 */
@Mapper
public interface HospitalMapper extends BaseMapper<Hospital> {
    
    /**
     * 根据医院编码查询医院信息
     */
    @Select("SELECT * FROM hospitals WHERE hospital_code = #{hospitalCode}")
    Hospital selectByCode(@Param("hospitalCode") String hospitalCode);
    
    /**
     * 获取所有启用的医院
     */
    @Select("SELECT * FROM hospitals WHERE is_active = 1 ORDER BY hospital_name")
    List<Hospital> selectActiveHospitals();
}
