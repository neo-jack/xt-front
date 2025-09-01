/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let max='';
    for(let i=0;i<s.length;i++){  // 修复：添加 let 声明
        getmax(i,i);
        getmax(i,i+1);
    }
    function getmax(left,right){
        while(left>=0 && right<s.length && s[left]===s[right]){
            left--;
            right++;
            
        }
        const maxstr=s.slice(left+1,right);
        if(maxstr.length>max.length){  // 修复：比较长度而不是字符串
            max=maxstr;
        }
    }
    return max;
};

// @lc code=end

