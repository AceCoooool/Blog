## [633. 平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)

给定一个非负整数 `c` ，你要判断是否存在两个整数 `a` 和 `b`，使得 `a2 + b2 = c` 。

**示例1 ：**

```
输入：c = 5
输出：true
解释：1 * 1 + 2 * 2 = 5
```

**示例2 ：**

```
输入：c = 3
输出：false
```

#### 解题思路

其实也可以转换为双指针问题，和167类似；只是改成从区间`[0, floor(sqrt(a))]`的范围进行双指针头尾收缩搜索

C++实现：

```cpp
class Solution {
public:
    bool judgeSquareSum(int c) {
        if (c <= 2)
            return true;
        long temp = c;
        long left = 0, right = sqrt(temp);
        while (left <= right) {
            if (left * left + right * right == temp)
                return true;
            else if (left * left + right * right < temp)
                left += 1;
            else
                right -= 1;
        }
        return false;
    }
};
```

Python实现：

```python
class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        # 相当于搜索[0,sqrt(c)]范围内的数, 是否存在满足的
        left, right = 0, math.floor(math.sqrt(c))
        while left <= right:
            value = left ** 2 + right ** 2
            if value == c:
                return True
            elif value > c:
                right -= 1
            else:
                left += 1
        return False
```

