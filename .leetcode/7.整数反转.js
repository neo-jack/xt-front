/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let rev = 0;
    const INT_MAX = 2147483647;  // 2^31 - 1
    const INT_MIN = -2147483648; // -2^31
    
    while (x !== 0) {
        const pop = x % 10;
        x = Math.trunc(x / 10);  // 向零取整，处理负数
        
        // 检查溢出
        if (rev > Math.trunc(INT_MAX / 10) || 
            (rev === Math.trunc(INT_MAX / 10) && pop > 7)) {
            return 0;
        }
        if (rev < Math.trunc(INT_MIN / 10) || 
            (rev === Math.trunc(INT_MIN / 10) && pop < -8)) {
            return 0;
        }
        
        rev = rev * 10 + pop;
    }
    
    return rev;
};
// @lc code=end
