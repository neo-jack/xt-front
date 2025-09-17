/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
/*----------------------------------
问题:给你一个单链表的头节点 head ，
    请你判断该链表是否为回文链表。
    如果是，返回 true ；否则，返回 false 。
思路:
    暴力解法 - 链表转数组 + 双指针判断回文

优化and出错:
    将值复制到数组中后用双指针法
    时间复杂度: O(n) - 需要遍历链表一次 + 遍历数组一次
    空间复杂度: O(n) - 需要额外数组存储所有节点值



-----------------------------------*/

var isPalindrome = function(head) {
    const vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};


//暴力解法
var isPalindrome2 = function (head) {
  // 边界情况：空链表或只有一个节点都是回文
  if (!head || !head.next) {
    return true;
  }

  let arr = [];
  let current = head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
// @lc code=end
