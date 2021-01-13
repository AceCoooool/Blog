## [135. 分发糖果](https://leetcode-cn.com/problems/candy/)

老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

- 每个孩子至少分配到 1 个糖果。
- 评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。

那么这样下来，老师至少需要准备多少颗糖果呢？

**示例 1：**

```
输入：[1,0,2]
输出：5
解释：你可以分别给这三个孩子分发 2、1、2 颗糖果。
```

**示例 2：**

```
输入：[1,2,2]
输出：4
解释：你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
```

#### 解题思路

把所有孩子的糖果数初始化为 1；先从左往右遍历一遍，如果右边孩子的评分比左边的高，则右边孩子的糖果数更新为左边孩子的糖果数加 1；再从右往左遍历一遍，如果左边孩子的评分比右边的高，且左边孩子当前的糖果数不大于右边孩子的糖果数，则左边孩子的糖果数更新为右边孩子的糖果数加 1。通过这两次遍历，分配的糖果就可以满足题目要求了。

**这里的贪心策略即为，在每次遍历中，只考虑并更新相邻一侧的大小关系。**

C++实现：

```cpp
class Solution {
public:
    int candy(vector<int> &ratings) {
        int pos;
        vector<int> candies(ratings.size(), 1);
        for (pos = 1; pos < ratings.size(); ++pos) {
            if (ratings[pos] > ratings[pos - 1])
                candies[pos] = candies[pos - 1] + 1;
        }
        for (pos = ratings.size() - 2; pos >= 0; --pos) {
            if (ratings[pos] > ratings[pos + 1]) {
                candies[pos] = max(candies[pos + 1] + 1, candies[pos]);
            }
        }
        return accumulate(candies.begin(), candies.end(), 0);
    }
};
```

Python实现：

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        candy_list = [1] * len(ratings)
        for i in range(1, len(ratings)):
            if ratings[i] > ratings[i - 1]:
                candy_list[i] = candy_list[i - 1] + 1
        for i in range(len(ratings) - 2, -1, -1):
            if ratings[i] > ratings[i + 1] and candy_list[i] <= candy_list[i + 1]:
                candy_list[i] = candy_list[i + 1] + 1
        return sum(candy_list)
```



