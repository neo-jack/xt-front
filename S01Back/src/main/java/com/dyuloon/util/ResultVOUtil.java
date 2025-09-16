package com.dyuloon.util;

import com.dyuloon.vo.ResultVO;

import java.util.List;

public class ResultVOUtil {

    public static ResultVO success(Object object,String msg){
        return  new ResultVO(0,object,msg);
    }

    public static ResultVO successVisualization(List list, String msg){
        return  new ResultVO(0,list,msg);
    }

    public static ResultVO fail(String msg){
        return new ResultVO(-1,msg);
    }

    public static ResultVO error(String msg){
        return new ResultVO(-2,msg);
    }

    public static ResultVO error(int code, String msg){
        return new ResultVO(code,msg);
    }

    public static ResultVO success(String msg){
        return new ResultVO(0,null,msg);
    }

}
