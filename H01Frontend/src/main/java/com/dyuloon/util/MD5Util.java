package com.dyuloon.util;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * MD5加密工具类
 */
public class MD5Util {

    /**
     * MD5加密
     */
    public static String encrypt(String password) {
        if (password == null || password.isEmpty()) {
            return null;
        }
        return DigestUtils.md5Hex(password);
    }

    /**
     * 验证密码
     */
    public static boolean verify(String inputPassword, String encryptedPassword) {
        if (inputPassword == null || encryptedPassword == null) {
            return false;
        }
        return encrypt(inputPassword).equals(encryptedPassword);
    }
}
