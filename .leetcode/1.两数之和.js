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
    
