package com.dyuloon.vo;

import lombok.Data;

@Data
public class ResultVO<T> {
    private Integer code;
    private T data;
    private String msg;

    public  ResultVO(){}

    public  ResultVO(Integer code,T data,String msg){
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public  ResultVO(Integer code,String msg){
        this.code = code;
        this.msg = msg;
    }
}


