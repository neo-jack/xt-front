package com.dyuloon; // 声明这个文件属于哪个包（文件夹）

// 导入需要使用的Spring Boot相关类，就像引入工具箱
import org.mybatis.spring.annotation.MapperScan; // 导入MyBatis扫描注解，用来自动扫描数据库操作类
import org.springframework.boot.SpringApplication; // 导入Spring Boot启动类，用来启动整个应用
import org.springframework.boot.autoconfigure.SpringBootApplication; // 导入Spring Boot应用注解，标记这是个Spring Boot项目


@SpringBootApplication // 告诉Spring这是一个Spring Boot应用的主类，会自动配置很多功能

@MapperScan("com.dyuloon.mapper") // 告诉MyBatis去扫描mapper包，自动创建数据库操作对象

public class UmiSystemApplication { // 定义主启动类

    
    public static void main(String[] args) { // 程序入口点，static表示不需要创建对象就能调用

        SpringApplication.run(UmiSystemApplication.class, args);
        
    }

}
