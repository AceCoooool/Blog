## [524. 通过删除字母匹配到字典里最长单词](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/)

给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

**示例1 ：**

```
输入:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

输出: 
"apple"
```

**示例2 ：**

```
输入:
s = "abpcplea", d = ["a","b","c"]

输出: 
"a"
```

#### 解题思路

首先对`d`中的字符串进行排序：字符长度优先，如果字符串长度相同则比较两个字符串的大小，小的优先；

然后将`s`和`d`中的字符串挨个匹配，如果匹配上则返回`d`：

- 匹配按照`s`的遍历，如果和`d`当前位置字符匹配上，则将`d`的位置往后移一个；如果最终`d`到达末尾，则代表匹配

C++实现：

```cpp
class Solution {
public:
    string findLongestWord(string s, vector<string> &d) {
        sort(d.begin(), d.end(),
             [](string &a, string &b) { return a.size() > b.size() ? true : (a.size() < b.size()) ? false : a < b; });
        int idx_a;
        for (string &a: d) {
            if (a.size() > s.size()) {
                continue;
            }
            idx_a = 0;
            for (int i = 0; i < s.size(); ++i) {
                if (s[i] == a[idx_a]) {
                    ++idx_a;
                    if (idx_a == a.size())
                        return a;
                }
            }
        }
        return "";
    }
};
```

Python实现：

```python
class Solution:
    def is_sub_str(self, s: str, t: str) -> bool:
        pointer, l = 0, len(s)
        for c in t:
            while pointer < l and s[pointer] != c:
                pointer += 1
            if pointer >= l:
                return False
            pointer += 1
        return True

    def findLongestWord(self, s: str, d: List[str]) -> str:
        d.sort(key=lambda a: (-len(a), a))
        for t in d:
            if self.is_sub_str(s, t):
                return t
        return ""
```

