package com.dyuloon.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * JSON文件操作工具类
 */
@Slf4j
@Component
public class JsonFileUtil {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * 更新用户头像URL
     * @param userId 用户ID
     * @param newAvatarUrl 新的头像URL
     * @return 是否更新成功
     */
    public boolean updateUserAvatar(Long userId, String newAvatarUrl) {
        try {
            // 获取项目根目录
            String projectRoot = System.getProperty("user.dir");
            String jsonFilePath = projectRoot + File.separator + "Data" + File.separator + "H01Frontend" + File.separator + "users.json";
            
            log.info("[JsonFileUtil] 更新用户头像，用户ID: {}, 新头像URL: {}, 文件路径: {}", userId, newAvatarUrl, jsonFilePath);
            
            // 检查文件是否存在
            File jsonFile = new File(jsonFilePath);
            if (!jsonFile.exists()) {
                log.error("[JsonFileUtil] users.json文件不存在: {}", jsonFilePath);
                return false;
            }
            
            // 读取JSON文件
            String jsonContent = new String(Files.readAllBytes(Paths.get(jsonFilePath)));
            JsonNode rootNode = objectMapper.readTree(jsonContent);
            
            if (!rootNode.isArray()) {
                log.error("[JsonFileUtil] users.json文件格式错误，不是数组格式");
                return false;
            }
            
            ArrayNode usersArray = (ArrayNode) rootNode;
            boolean userFound = false;
            
            // 遍历用户数组，找到对应的用户并更新头像
            for (int i = 0; i < usersArray.size(); i++) {
                JsonNode userNode = usersArray.get(i);
                if (userNode.isObject()) {
                    ObjectNode userObject = (ObjectNode) userNode;
                    JsonNode idNode = userObject.get("id");
                    
                    if (idNode != null && idNode.asLong() == userId) {
                        // 找到对应用户，更新头像URL
                        userObject.put("user_avatar", newAvatarUrl);
                        userObject.put("updated_at", java.time.LocalDateTime.now().toString());
                        userFound = true;
                        log.info("[JsonFileUtil] 找到用户ID: {}, 更新头像URL为: {}", userId, newAvatarUrl);
                        break;
                    }
                }
            }
            
            if (!userFound) {
                log.warn("[JsonFileUtil] 未找到用户ID: {}", userId);
                return false;
            }
            
            // 写回JSON文件
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(jsonFile, usersArray);
            log.info("[JsonFileUtil] 成功更新users.json文件");
            
            return true;
            
        } catch (IOException e) {
            log.error("[JsonFileUtil] 更新users.json文件失败: {}", e.getMessage(), e);
            return false;
        }
    }
    
    /**
     * 获取用户信息
     * @param userId 用户ID
     * @return 用户信息JSON节点，如果未找到返回null
     */
    public JsonNode getUserInfo(Long userId) {
        try {
            String projectRoot = System.getProperty("user.dir");
            String jsonFilePath = projectRoot + File.separator + "Data" + File.separator + "H01Frontend" + File.separator + "users.json";
            
            File jsonFile = new File(jsonFilePath);
            if (!jsonFile.exists()) {
                return null;
            }
            
            String jsonContent = new String(Files.readAllBytes(Paths.get(jsonFilePath)));
            JsonNode rootNode = objectMapper.readTree(jsonContent);
            
            if (!rootNode.isArray()) {
                return null;
            }
            
            ArrayNode usersArray = (ArrayNode) rootNode;
            
            for (JsonNode userNode : usersArray) {
                if (userNode.isObject()) {
                    JsonNode idNode = userNode.get("id");
                    if (idNode != null && idNode.asLong() == userId) {
                        return userNode;
                    }
                }
            }
            
            return null;
            
        } catch (IOException e) {
            log.error("[JsonFileUtil] 读取用户信息失败: {}", e.getMessage(), e);
            return null;
        }
    }
}
