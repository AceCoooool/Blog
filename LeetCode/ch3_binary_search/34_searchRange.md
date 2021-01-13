## [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

给定一个按照升序排列的整数数组 `nums`，和一个目标值 `target`。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 `target`，返回 `[-1, -1]`。

进阶：

- 你可以设计并实现时间复杂度为 $O(log n)$ 的算法解决此问题吗？

**示例 1：**

```
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
```

**示例 2：**

```
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
```

**示例 3：**

```
输入：nums = [], target = 0
输出：[-1,-1]
```

#### 解题思路

其实就是binary-search的lower_bound和upper_bound问题

C++实现：

```cpp
class Solution {
public:
    int lower_bound(vector<int> &nums, int target) {
        int left = 0, right = nums.size() - 1, mid;
        while (left < right) {
            mid = (left + right) / 2;
            if (nums[mid] >= target)
                right = mid;
            else
                left = mid + 1;
        }
        return nums[right] != target ? -1 : right;
    }

    int upper_bound(vector<int> &nums, int target) {
        int left = 0, right = nums.size() - 1, mid;
        while (left <= right) {
            mid = (left + right) / 2;
            if (nums[mid] <= target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return (left > 0 && nums[left - 1] != target) ? -1 : left - 1;
    }

    vector<int> searchRange(vector<int> &nums, int target) {
        if (nums.size() == 0) {
            return {-1, -1};
        }
        int left = lower_bound(nums, target);
        int right = upper_bound(nums, target);
        return {left, right};
    }
};
```

Python实现：

```python
class Solution:
    def search_left(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] >= target:
                right = mid
            else:  # 保证了最后一次进入必然满足<target
                left = mid + 1
        return left if left < len(nums) and nums[left] == target else -1

    def search_right(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > target:
                right = mid
            else:  # 保证最后一次进入必然满足<=target
                left = mid + 1
        return left - 1 if (left > 0 and nums[left - 1] == target) else -1

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left = self.search_left(nums, target)
        right = self.search_right(nums, target)
        return [left, right]
```