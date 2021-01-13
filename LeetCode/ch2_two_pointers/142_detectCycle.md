## [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 `null`。

为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。 如果`pos` 是 `-1`，则在该链表中没有环。注意，`pos` 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。

进阶：

- 你是否可以使用 O(1) 空间解决此题？

**示例1 ：**

```
3---2---0---4
    |       |
    ---------
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例2 ：**

```
1---2
|   |
-----
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例3 ：**

```
1
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
```

#### 解题思路

对于链表找环路的问题，有一个通用的解法——快慢指针（Floyd 判圈法）。给定两个指针，分别命名为 slow 和 fast，起始位置在链表的开头。每次 fast 前进两步，slow 前进一步。如果 fast可以走到尽头，那么说明没有环路；如果 fast 可以无限走下去，那么说明一定有环路，且一定存在一个时刻 slow 和 fast 相遇。当 slow 和 fast 第一次相遇时，我们将 fast 重新移动到链表开头，并让 slow 和 fast 每次都前进一步。当 slow 和 fast 第二次相遇时，相遇的节点即为环路的开始点。

下面证明一下，假设环里的元素有k个，环外的元素有a个：

第一次相遇的情况：

```
2*x=s*k+a
x=u*k+a
---> x=(s-u)*k 
```

说明第一次相遇后，slow在`(s-u)*k`的位置，只需多走`a`步就到达"环路的起始点"；所以此时将fast挪回起始位置，然后走`a`步就能够再次和slow相遇，且相遇为环路的起始点

C++实现：

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (head == nullptr || head->next == nullptr)
            return nullptr;
        ListNode *slow = head->next, *fast = head->next->next;
        while (slow != fast) {
            if (fast == nullptr || fast->next == nullptr)
                return nullptr;
            fast = fast->next->next;
            slow = slow->next;
        }
        fast = head;
        while (fast != slow) {
            fast = fast->next;
            slow = slow->next;
        }
        return slow;
    }
};
```

Python实现：

```python
class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        if head is None or head.next is None:
            return None
        fast_pointer, slow_pointer = head.next.next, head.next
        # step1: 获取第一次相遇
        while fast_pointer != slow_pointer:
            if fast_pointer is None or fast_pointer.next is None:
                return None
            fast_pointer = fast_pointer.next.next
            slow_pointer = slow_pointer.next
        # step2: 获取第二次相遇
        fast_pointer = head
        while fast_pointer != slow_pointer:
            fast_pointer = fast_pointer.next
            slow_pointer = slow_pointer.next
        return fast_pointer
```

