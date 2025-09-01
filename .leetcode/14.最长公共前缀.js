/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 边界条件检查
  if (strs.length === 1) {
    return strs[0];
  }

  // 以第一个字符串为基准
  let result = strs[0];

  // 遍历所有字符串，找到公共前缀
  for (let i = 1; i < strs.length; i++) {
    // 检查当前字符串是否为空
    if (!strs[i]) {
      return "";
    }

    // 找到当前字符串与result的公共前缀
    while (!strs[i].startsWith(result)) {
      result = result.substring(0, result.length - 1);
      if (result === "") {
        return "";
      }
    }
  }

  return result;
};
// @lc code=end
