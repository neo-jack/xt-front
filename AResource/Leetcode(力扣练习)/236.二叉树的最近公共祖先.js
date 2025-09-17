/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

/*----------------------------------
问题:
    给定一个二叉树, 找到该树中两个指定节点的最近公共祖先

思路:
    递归遍历+左右分治
    通过判断节点有值,将目标节点设为1,其他节为0,将目标节点往上移
    
优化and出错:
    递归终止条件错误

-----------------------------------*/

var lowestCommonAncestor = function (root, p, q) {
  // 递归终止条件：如果当前节点为空，或者当前节点就是p或q，直接返回当前节点
  if (!root || root === p || root === q) {
    return root;
  }

  // 分治：递归查找左子树和右子树
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // 根据左右子树的返回值进行判断
  if (left && right) {
    // 如果左右子树都找到了节点，说明p和q分别在左右子树，当前节点是LCA
    return root;
  }

  // 如果只有一边找到了节点，返回找到的那一边的结果
  return left || right;
};
// @lc code=end
