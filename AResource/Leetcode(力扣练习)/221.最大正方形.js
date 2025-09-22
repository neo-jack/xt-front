/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
/*----------------------------------
问题:
    在一个由 '0' 和 '1' 组成的二维矩阵内，
    找到只包含 '1' 的最大正方形，并返回其面积
思路:
    
优化and出错:
    没有思路
    动态规划


-----------------------------------*/
var maximalSquare = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') {
                f[i + 1][j + 1] = Math.min(f[i][j], f[i][j + 1], f[i + 1][j]) + 1;
                ans = Math.max(ans, f[i + 1][j + 1]);
            }
        }
    }
    return ans * ans;
};
// @lc code=end

