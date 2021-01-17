(self.webpackChunkblog=self.webpackChunkblog||[]).push([[461],{18461:n=>{n.exports="## [605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)\n\n假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。\n\n给你一个整数数组  `flowerbed `表示花坛，由若干` 0` 和 `1 `组成，其中 `0 `表示没种植花，`1 `表示种植了花。另有一个数 `n` ，能否在不打破种植规则的情况下种入` n` 朵花？能则返回` true` ，不能则返回 `false`。\n\n**示例 1：**\n\n```\n输入：flowerbed = [1,0,0,0,1], n = 1\n输出：true\n```\n\n**示例 2：**\n\n```\n输入：flowerbed = [1,0,0,0,1], n = 2\n输出：false\n```\n\n#### 解题思路\n\n题目其实本质上相当于求花坛最多还能够种下多少花，其实就是从左往右很暴力地去评判每个位置是否能够种花即可\n\n**这里的贪心策略即为：当前位置能种就种！**\n\nC++实现：\n\n```cpp\nclass Solution {\npublic:\n    bool canPlaceFlowers(vector<int> &flowerbed, int n) {\n        int can_place = 0;\n        for (int i = 0; i < flowerbed.size(); ++i) {\n            if (flowerbed[i] == 1)\n                continue;\n            if (i == 0) {\n                if (i + 1 == flowerbed.size() || flowerbed[i + 1] == 0) {\n                    flowerbed[i] = 1;\n                    can_place += 1;\n                }\n            } else if (i == flowerbed.size() - 1) {\n                if (i - 1 < 0 || flowerbed[i - 1] == 0) {\n                    flowerbed[i] = 1;\n                    can_place += 1;\n                }\n            } else if (i - 1 >= 0 && i + 1 < flowerbed.size() && flowerbed[i - 1] == 0 && flowerbed[i + 1] == 0) {\n                flowerbed[i] = 1;\n                can_place += 1;\n            }\n        }\n        return can_place >= n;\n    }\n};\n```\n\nPython实现：\n\n```python\nclass Solution:\n    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:\n        res = 0\n        for i in range(len(flowerbed)):\n            if flowerbed[i] == 1 or (i + 1 < len(flowerbed) and flowerbed[i + 1] == 1):\n                continue\n            if i == 0 or flowerbed[i - 1] == 0:\n                res += 1\n                flowerbed[i] = 1\n        return res >= n\n```\n\n\n\n"}}]);