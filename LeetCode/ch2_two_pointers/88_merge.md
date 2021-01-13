## [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

给你两个有序整数数组 `nums1` 和 `nums2`，请你将 `nums2` 合并到 `nums1` 中*，*使 `nums1` 成为一个有序数组。

说明：

- 初始化 `nums1` 和 `nums2` 的元素数量分别为 `m` 和 `n` 。
- 你可以假设` nums1` 有足够的空间（空间大小大于或等于` m + n`）来保存 `nums2 `中的元素。

**示例 ：**

```
输入：
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出：[1,2,2,3,5,6]
```

#### 解题思路

因为这两个数组已经排好序，我们可以把两个指针分别放在两个数组的末尾，即 `nums1` 的 `m-1` 位和 `nums2` 的 `n 1` 位。每次将较大的那个数字复制到 `nums1 `的后边，然后向前移动一位。因为我们也要定位 `nums1` 的末尾，所以我们还需要第三个指针，以便复制。

C++实现：

```cpp
class Solution {
public:
    void merge(vector<int> &nums1, int m, vector<int> &nums2, int n) {
        int idx1 = m - 1, idx2 = n - 1, idx = m + n - 1;
        while (idx1 >= 0 && idx2 >= 0) {
            if (nums1[idx1] > nums2[idx2]) {
                nums1[idx] = nums1[idx1];
                idx1 -= 1;
            } else {
                nums1[idx] = nums2[idx2];
                idx2 -= 1;
            }
            idx -= 1;
        }
        while (idx2 >= 0) {
            nums1[idx--] = nums2[idx2--];
        }
    }
};
```

Python实现：

```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        final_idx = len(nums1) - 1
        m, n = m - 1, n - 1
        while m >= 0 and n >= 0:
            if nums1[m] > nums2[n]:
                nums1[final_idx] = nums1[m]
                m -= 1
            else:
                nums1[final_idx] = nums2[n]
                n -= 1
            final_idx -= 1
        while n >= 0:
            nums1[final_idx] = nums2[n]
            n -= 1
            final_idx -= 1
```

