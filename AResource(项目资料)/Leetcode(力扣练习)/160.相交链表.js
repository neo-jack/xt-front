/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/*----------------------------------
问题:
    给你两个单链表的头节点 headA 和 headB ，
    请你找出并返回两个单链表相交的起始节点。
    如果两个链表不存在相交节点，返回 null 
思路:
    暴力解法，a的每个节点便利b的每个节点,可是否有相同的节点，有则存在
优化and出错:
    变量声明：li 没有用 let 声明
    边界检查：没有检查空链表的情况
    双指针思路
-----------------------------------*/

var getIntersectionNode2 = function (headA, headB) {
  // 边界检查
  if (!headA || !headB) return null;

  // 遍历链表A的每个节点
  for (; headA != null; headA = headA.next) {
    let li = headB;
    // 遍历链表B的每个节点
    for (; li != null; li = li.next) {
      if (headA === li) {
        return headA;
      }
    }
  }
  return null;
};

// 双指针
var getIntersectionNode = function (headA, headB) {
  // 边界检查
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  while (pA !== pB) {
    // pA走到末尾就转到headB，否则继续下一个节点
    pA = pA ? pA.next : headB;
    // pB走到末尾就转到headA，否则继续下一个节点
    pB = pB ? pB.next : headA;
  }

  // 返回交点（如果有的话），否则返回null
  return pA;
};

// @lc code=end
