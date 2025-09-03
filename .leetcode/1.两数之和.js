/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    /* 暴力破解
    var twoSum = function(nums, target) {
    for(var i = 0; i < nums.length; i++) {
        for(var j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    return []
    };
    */
    //hash优化
    const hashcuren={};
    for(let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const complement = target - current;
        if(hashcuren[complement] !== undefined) {
            return [hashcuren[complement], i];
        }
        hashcuren[current] = i;
    }
    return [];
};
// @lc code=end
    
