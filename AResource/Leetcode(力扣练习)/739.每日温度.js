/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

/*----------------------------------
问题:
    给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
    其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
    如果气温在这之后都不会升高，请在该位置用 0 来代替。
思路:
    暴力
优化and出错:
    暴力超时，通过栈来优化

-----------------------------------*/
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const ans = Array(n).fill(0);
    const st = [];
    for (let i = n - 1; i >= 0; i--) {
        const t = temperatures[i];
        while (st.length && t >= temperatures[st[st.length - 1]]) {
            st.pop();
        }
        if (st.length) {
            ans[i] = st[st.length - 1] - i;
        }
        st.push(i);
    }
    return ans;
};

// @lc code=end

