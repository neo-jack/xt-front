/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let result = 0;
    let sign = 1;
    let i = 0;
    
    // 跳过前导空格
    while (i < s.length && s[i] === ' ') {
        i++;
    }
    
    // 处理符号
    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    
    // 读取数字
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        result = result * 10 + (s[i] - '0');
        
        // 检查溢出
        if (sign === 1 && result > 2147483647) {
            return 2147483647;
        }
        if (sign === -1 && result > 2147483648) {
            return -2147483648;
        }
        
        i++;
    }
    
    return sign * result;
};
// @lc code=end

