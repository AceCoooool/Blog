## [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:

- 可以认为区间的终点总是大于它的起点。
- 区间` [1,2] `和` [2,3] `的边界相互“接触”，但没有相互重叠。

**示例 1:**

```
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

**示例 2:**

```
输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

#### 解题思路

在选择要保留区间时，区间的结尾十分重要：选择的区间结尾越小，余留给其它区间的空间就越大，就越能保留更多的区间。

**采取的贪心策略为，优先保留结尾小且不相交的区间。**

C++实现：

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>> &intervals) {
        if (intervals.size() < 1)
            return 0;
        sort(intervals.begin(), intervals.end(), [](vector<int> a, vector<int> b) { return a[1] < b[1]; });
        int res = 0, value = intervals[0][1];
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] < value) {
                res += 1;
            } else {
                value = intervals[i][1];
            }
        }
        return res;
    }
};
```

Python实现：

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if len(intervals) <= 1:
            return 0
        intervals.sort(key=lambda v: v[1])
        res, cur_val = 0, intervals[0][1]
        for val in intervals[1:]:
            if val[0] < cur_val:
                res += 1
            else:
                cur_val = val[1]
        return res
```





