/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // 双指针法 - 时间复杂度 O(n)
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        // 计算当前面积
        const width = right - left;
        const height1 = Math.min(height[left], height[right]);
        const currentArea = width * height1;
        
        // 更新最大面积
        maxArea = Math.max(maxArea, currentArea);
        
        // 移动较短的指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
};
// @lc code=end

