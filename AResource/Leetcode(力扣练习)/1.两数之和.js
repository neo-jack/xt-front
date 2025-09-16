/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

/*----------------------------------
问题:
    给定一个整数数组 nums 和一个整数目标值 target，
    请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
思路:
  
优化and出错:
   哈希优化

-----------------------------------*/
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//暴力枚举
var twoSum = function (nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};
//哈希优化
const twoSum2 = (nums, target) => {
    const prevNums = {};                    // 存储出现过的数字，和对应的索引               
  
    for (let i = 0; i < nums.length; i++) {       // 遍历元素   
      const curNum = nums[i];                     // 当前元素   
      const targetNum = target - curNum;          // 满足要求的目标元素   
      const targetNumIndex = prevNums[targetNum]; // 在prevNums中获取目标元素的索引
      if (targetNumIndex !== undefined) {         // 如果存在，直接返回 [目标元素的索引,当前索引]
        return [targetNumIndex, i];
      } else {                                    // 如果不存在，说明之前没出现过目标元素
        prevNums[curNum] = i;                     // 存入当前的元素和对应的索引
      }
    }
}
// @lc code=end
