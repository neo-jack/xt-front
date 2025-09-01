/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let y = x.toString();
    let left = 0;
    let right = y.length - 1;

    while(left < right) {
        if(y[left] !== y[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};
// @lc code=end

