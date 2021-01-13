## [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

实现 `int sqrt(int x)` 函数。

计算并返回 `x `的平方根，其中` x` 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

**示例 1：**

```
输入: 4
输出: 2
```

**示例 2：**

```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

#### 解题思路

我们可以把这道题想象成，给定一个非负整数 `a`，求 $f(x)=x^2- a=0$ 的解。因为我们只考虑 $x \ge 0$，所以 $f(x)$ 在定义域上是单调递增的。考虑到 $f(0)=-a\le 0, f(a)=a^2-a\ge 0$，我们可以对 `[0, a]` 区间使用二分法找到$f(x)=0$的解。

C++实现：

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0)
            return 0;
        int left = 1, right = x, mid, half;
        while (left <= right) {
            mid = left + (right - left) / 2;
            half = x / mid;
            if (half == mid)
                return mid;
            else if (half > mid)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return right;  // 由于最终half*mid必然小于x, 所以此处取right是满足条件的
    }
};
```

Python实现：

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0
        left, right = 1, x
        while left <= right:
            mid = (left + right) // 2
            value = x // mid
            if mid == value:
                return mid
            elif mid > value:
                right = mid - 1
            else:
                left = mid + 1
        return right
```