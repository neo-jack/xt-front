/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let acc= new Set();
    let n = s.length;
    let rk=-1;
    let ans=0;
    for(let i=0;i<n;i++){
        //初始化
        if(i!=0){
            acc.delete(s[i-1]);
        }
        //右指针
        while(rk+1<n && !acc.has(s[rk+1])){
            acc.add(s[rk+1]);
            rk++;
        }
        ans=Math.max(ans,rk-i+1);
    }
    return ans;
};
// @lc code=end

