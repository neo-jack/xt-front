/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
/*----------------------------------
问题:
    给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
思路:
    递归交换
优化and出错:


-----------------------------------*/
var invertTree = function (root) {
  // 递归终止条件：如果节点为空，直接返回
  if (root === null) {
    return null;
  }

  // 先递归翻转左右子树
  let left = invertTree(root.left);
  let right = invertTree(root.right);

  // 交换左右子树
  root.left = right;
  root.right = left;

  return root;
};
// @lc code=end
