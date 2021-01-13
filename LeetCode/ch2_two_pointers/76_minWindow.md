## [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

给你一个字符串 `s` 、一个字符串` t` 。返回 `s `中涵盖` t` 所有字符的最小子串。如果 `s` 中不存在涵盖 `t `所有字符的子串，则返回空字符串 `"" `。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

**示例 1：**

```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

**示例 2：**

```
输入：s = "a", t = "a"
输出："a"
```

#### 解题思路

本题使用滑动窗口求解，即两个指针`l` 和 `r` 都是从最左端向最右端移动，且 `l` 的位置一定在`r` 的左边或重合。注意本题虽然在` for` 循环里出现了一个 `while` 循环，但是因为` while` 循环负责移动 `l` 指针，且 `l`只会从左到右移动一次，因此总时间复杂度仍然是 `O(n)`。本题使用了长度为 128的数组来映射字符，也可以用哈希表替代；其中 `chars` 表示目前每个字符缺少的数量，`flag` 表示每个字符是否在` T `中存在。

C++实现：

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> chars(128, 0);
        vector<bool> flag(128, false);
        for (int i = 0; i < t.size(); ++i) {
            flag[t[i]] = true;
            ++chars[t[i]];
        }
        int cnt = 0, l = 0, min_l = 0, min_size = s.size() + 1;
        for (int r = 0; r < s.size(); ++r) {
            if (flag[s[r]]) {
                if (--chars[s[r]] >= 0) {
                    ++cnt;
                }
                while (cnt == t.size()) {
                    if (r - l + 1 < min_size) {
                        min_l = l;
                        min_size = r - l + 1;
                    }
                    if (flag[s[l]] && ++chars[s[l]] > 0)
                        --cnt;
                    ++l;
                }
            }
        }
        return min_size > s.size() ? "" : s.substr(min_l, min_size);
    }
};
```

Python实现：

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        chartonum = Counter(t)
        total_num, cur_num = len(t), 0
        left = 0
        res = [0, len(s) + 1]
        for i, c in enumerate(s):
            if c in chartonum:
                if chartonum[c] > 0:
                    cur_num += 1
                chartonum[c] -= 1
                # 移动左边
                while cur_num == total_num:
                    if res[1] - res[0] > i + 1 - left:
                        res = [left, i + 1]
                    if s[left] in chartonum:
                        if chartonum[s[left]] >= 0:
                            cur_num -= 1
                        chartonum[s[left]] += 1
                    left += 1
        return '' if res[1] - res[0] == len(s) + 1 else s[res[0]: res[1]]
```

