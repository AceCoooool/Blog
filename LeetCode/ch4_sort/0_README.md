## 排序算法
下述内容来自：[1.0 十大经典排序算法 | 菜鸟教程](https://www.runoob.com/w3cnote/ten-sorting-algorithm.html)

### 冒泡排序

冒泡排序（Bubble Sort）是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。

核心步骤：

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

C++实现：

```cpp
class Solution {
public:
    void bubble_sort(vector<int> &nums) {
        int n = nums.size();
        bool swapped;
        for (int i = 1; i < n; ++i) {
            swapped = false;
            for (int j = 1; j < n - i + 1; ++j) {
                if (nums[j] < nums[j - 1]) {
                    swap(nums[j], nums[j - 1]);
                    swapped = true;
                }
            }
            if (!swapped)
                break;
        }
    }
};
```

Python实现：

```python
class Solution:
    def bubble_sort(self, nums: List[int]):
        for i in range(1, len(nums)):
            swapped = False
            for j in range(1, len(nums) - i + 1):
                if nums[j] < nums[j - 1]:
                    nums[j], nums[j - 1] = nums[j - 1], nums[j]
                    swapped = True
            if not swapped:
                break
```

### 选择排序

选择排序是一种简单直观的排序算法，无论什么数据进去都是$O(n^2)$的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

核心步骤：

- 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。

- 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

- 重复第二步，直到所有元素均排序完毕。

C++实现：

```cpp
class Solution {
public:
    void selection_sort(vector<int> &nums) {
        int select, n = nums.size();
        for (int i = 0; i < n - 1; ++i) {
            select = i;
            for (int j = i + 1; j < n; ++j) {
                if (nums[j] < nums[select])
                    select = j;
            }
            swap(nums[i], nums[select]);
        }
    }
};
```

Python实现：

```python
class Solution:
    def selection_sort(self, nums: List[int]):
        for i in range(0, len(nums) - 1):
            pos = i
            for j in range(i + 1, len(nums)):
                if nums[j] < nums[pos]:
                    pos = j
            nums[i], nums[pos] = nums[pos], nums[i]
```

### 插入排序

插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

核心步骤：

- 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
- 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

C++实现：

```cpp
class Solution {
public:
    void insertion_sort(vector<int> &nums) {
        for (int i = 0; i < nums.size(); ++i) {
            for (int j = i; j > 0 && nums[j] < nums[j - 1]; --j)
                swap(nums[j], nums[j - 1]);
        }
    }
};
```

Python实现：

```python
class Solution:
    def insertion_sort(self, nums: List[int]):
        for i in range(len(nums)):
            for j in range(i, 0, -1):
                if nums[j] < nums[j - 1]:
                    nums[j], nums[j - 1] = nums[j - 1], nums[j]
                else:
                    break
```

