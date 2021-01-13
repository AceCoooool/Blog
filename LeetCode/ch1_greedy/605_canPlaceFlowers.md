## [605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给你一个整数数组  `flowerbed `表示花坛，由若干` 0` 和 `1 `组成，其中 `0 `表示没种植花，`1 `表示种植了花。另有一个数 `n` ，能否在不打破种植规则的情况下种入` n` 朵花？能则返回` true` ，不能则返回 `false`。

**示例 1：**

```
输入：flowerbed = [1,0,0,0,1], n = 1
输出：true
```

**示例 2：**

```
输入：flowerbed = [1,0,0,0,1], n = 2
输出：false
```

#### 解题思路

题目其实本质上相当于求花坛最多还能够种下多少花，其实就是从左往右很暴力地去评判每个位置是否能够种花即可

**这里的贪心策略即为：当前位置能种就种！**

C++实现：

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int> &flowerbed, int n) {
        int can_place = 0;
        for (int i = 0; i < flowerbed.size(); ++i) {
            if (flowerbed[i] == 1)
                continue;
            if (i == 0) {
                if (i + 1 == flowerbed.size() || flowerbed[i + 1] == 0) {
                    flowerbed[i] = 1;
                    can_place += 1;
                }
            } else if (i == flowerbed.size() - 1) {
                if (i - 1 < 0 || flowerbed[i - 1] == 0) {
                    flowerbed[i] = 1;
                    can_place += 1;
                }
            } else if (i - 1 >= 0 && i + 1 < flowerbed.size() && flowerbed[i - 1] == 0 && flowerbed[i + 1] == 0) {
                flowerbed[i] = 1;
                can_place += 1;
            }
        }
        return can_place >= n;
    }
};
```

Python实现：

```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        res = 0
        for i in range(len(flowerbed)):
            if flowerbed[i] == 1 or (i + 1 < len(flowerbed) and flowerbed[i + 1] == 1):
                continue
            if i == 0 or flowerbed[i - 1] == 0:
                res += 1
                flowerbed[i] = 1
        return res >= n
```



