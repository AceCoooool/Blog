## [154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组` [0,1,2,4,5,6,7] `可能变为` [4,5,6,7,0,1,2]` )。

请找出其中最小的元素。

注意数组中可能存在重复的元素。

**示例 1：**

```
输入: [1,3,5]
输出: 1
```

**示例 2：**

```
输入: [2,2,2,0,1]
输出: 0
```

#### 解题思路

类似题目81的解法，每次知道半边的有序，而这个半边有序就可以获取这半边的最小值，然后继续二分搜索另外半边

C++实现：

```c++
class Solution {
public:
    int findMin(vector<int> &nums) {
        int res = nums[0];
        int left = 0, right = nums.size() - 1, mid;
        while (left <= right) {
            mid = (left + right) / 2;
            if (nums[mid] == nums[left]){
                res = min(res, nums[mid]);
                ++left;
            }
            else if (nums[mid] > nums[left]) {
                res = min(nums[left], res);
                left = mid + 1;
            } else {
                res = min(res, nums[mid]);
                right = mid - 1;
            }
        }
        return res;
    }
};
```

Python实现：

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        res = nums[0]
        while left <= right:
            mid = (left + right) // 2
            res = min(res, nums[mid])
            if nums[mid] == nums[left]:
                left += 1
            elif nums[mid] > nums[left]:
                # 左半边有序
                res = min(res, nums[left])
                left = mid + 1
            else:
                # 右半边有序
                right = mid - 1
        return res
```

