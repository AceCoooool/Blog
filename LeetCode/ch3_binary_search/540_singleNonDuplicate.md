## [540. 有序数组中的单一元素](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

**示例 1：**

```
输入: [1,1,2,3,3,4,4,8,8]
输出: 2
```

**示例 2：**

```
输入: [3,3,7,7,10,11,11]
输出: 10
```

#### 解题思路

在出现单个数字之前，成对出现的位置都是在"先偶后奇"，但是在出现单个数字之后，就变成了"先奇后偶"，例如示例1中的情况：

```
[1,1,2,3,3,4,4,8,8]
 0 1 2 3 4 5 6 7 8
```

C++实现：

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int> &nums) {
        int left = 0, right = nums.size() - 1, mid;
        if (right == left || nums[left] != nums[left + 1])
            return nums[left];
        if (nums[right] != nums[right - 1])
            return nums[right];
        while (left <= right) {
            mid = (left + right) / 2;
            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1])
                return nums[mid];
            if (mid % 2 == 0) {
                if (nums[mid] == nums[mid - 1])
                    right = mid;
                else
                    left = mid;
            } else {
                if (nums[mid] == nums[mid - 1])
                    left = mid;
                else
                    right = mid;
            }
        }
        return -1;
    }
};
```

Python实现：

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if mid - 1 >= 0 and nums[mid] == nums[mid - 1]:
                # 凑上mid为偶数时
                if (mid + 1) % 2 == 0:
                    left = mid + 1
                else:
                    right = mid - 1
            elif mid + 1 < len(nums) and nums[mid] == nums[mid + 1]:
                # 凑上mid为偶数时
                if (mid + 1) % 2 == 0:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                return nums[mid]
        return -1
```