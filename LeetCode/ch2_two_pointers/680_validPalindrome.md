## [680. 验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)

给定一个非空字符串 `s`，**最多**删除一个字符。判断是否能成为回文字符串。

**示例1 ：**

```
输入: "aba"
输出: True
```

**示例2 ：**

```
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

#### 解题思路

采用双指针，从两头进行收缩，分为两种情况：

1. 当`s[left]==s[right]`：则分别`left+1, right-1`
2. 如果`s[left]!=s[right]`：则分别判断`[left+1, right]`和`[left, right+1]`是否是回文字符，如果是返回`true`，否则返回`false`

C++实现：

```cpp
class Solution {
public:
    bool isPalindrome(string &s, int left, int right) {
        while (left < right) {
            if (s[left] == s[right]) {
                ++left;
                --right;
            } else
                return false;
        }
        return true;
    }

    bool validPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            if (s[left] == s[right]) {
                ++left;
                --right;
            } else {
                return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
            }
        }
        return true;
    }
};
```

Python实现：

```python
class Solution:
    def isPalindrome(self, s: str):
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] == s[right]:
                left += 1
                right -= 1
            else:
                return False
        return True

    def validPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] == s[right]:
                left += 1
                right -= 1
            else:
                return self.isPalindrome(s[left + 1:right + 1]) or self.isPalindrome(s[left:right])
        return True
```

