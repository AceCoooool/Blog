## [763. 划分字母区间](https://leetcode-cn.com/problems/partition-labels/)

字符串 `S` 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

**示例 :**

```
输入：S = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
```

#### 解题思路

先确定每个字母最后一次出现所在的位置；然后遍历：当前区间为第一个元素到其最后一次出现的位置，如果这个区间内的元素存在最后一个元素超过原先区间，则扩展当前区间；直到区间内的元素都满足“最后一次出现也在区间内这个条件”，则开始一个新区间

**采取的贪心策略为，每个元素都去扩展一下当前区间的边界。**

C++实现：

```cpp
class Solution {
public:
    vector<int> partitionLabels(string S) {
        if (S.length() < 1)
            return {0};
        vector<int> last_char(128, 0);
        for (int i = 0; i < S.length(); ++i) {
            last_char[S[i] - 'a'] = i;
        }
        int left = 0, right = last_char[S[0] - 'a'];
        vector<int> res;
        for (int i = 0; i < S.length(); ++i) {
            if (i > right) {
                res.push_back(right - left + 1);
                left = i;
                right = last_char[S[i] - 'a'];
            } else {
                right = max(right, last_char[S[i] - 'a']);
            }
        }
        res.push_back(right - left + 1);
        return res;
    }
};
```

Python实现：

```python
class Solution:
    def partitionLabels(self, S: str) -> List[int]:
        if len(S) == 1:
            return [1]
        res = []
        c_to_loc = dict()
        for i, c in enumerate(S):
            if c in c_to_loc:
                c_to_loc[c] = [c_to_loc[c][0], i]
            else:
                c_to_loc[c] = [i]

        start_loc, next_loc = 0, c_to_loc[S[0]][-1]
        for i, c in enumerate(S):
            if i > next_loc:
                res.append(i - start_loc)
                next_loc = c_to_loc[c][-1]
                start_loc = i
            else:
                next_loc = max(next_loc, c_to_loc[c][-1])
        if next_loc + 1 > start_loc:
            res.append(next_loc - start_loc + 1)
        return res
```





