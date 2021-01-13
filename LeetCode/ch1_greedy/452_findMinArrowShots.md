## [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 $x_{start}$，$x_{end}$， 且满足  $x_{start} \le x \le x_{end}$，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

给你一个数组 `points` ，其中 $points [i] = [x_{start},x_{end}]$ ，返回引爆所有气球所必须射出的最小弓箭数。

**示例 1：**

```
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
```

**示例 2：**

```
输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
```

#### 解题思路

先按照区间的结尾进行排序，然后如果当前的气球能够和前面的气球们的公共区间一起引爆，就一起引爆（即当前气球的左区间落入公共区间（能够将气球们一起引爆的范围），并修正公共区间的大小），否则作为新的公共区间

**采取的贪心策略为，能够和左边的气球们（公共区间）一起引爆，就和一起引爆。**

C++实现：

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>> &points) {
        if (points.size() == 0)
            return 0;
        sort(points.begin(), points.end(), [](vector<int> a, vector<int> b) { return a[1] < b[1]; });
        int res = 1, left = points[0][0], right = points[0][1];
        for (int i = 1; i < points.size(); ++i) {
            if (points[i][0] <= right) {
                left = min(left, points[i][0]);
            } else {
                left = points[i][0];
                right = points[i][1];
                res += 1;
            }
        }
        return res;
    }
};
```

Python实现：

```python
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if len(points) <= 1:
            return len(points)
        points.sort(key=lambda v: v[1])
        res = 1
        cur_val = points[0][1]
        for point in points[1:]:
            if point[0] <= cur_val:
                continue
            else:
                res += 1
                cur_val = point[1]
        return res
```

