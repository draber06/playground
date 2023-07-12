import assert from "assert";
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = (head, left, right) => {
    let start = head;
    let cur = head;
    let i = 1;
    while (i < left) {
        start = cur;
        cur = cur.next;
        i++;
    }
    let prev = null;
    const tail = cur;
    while (i <= right) {
        const { next } = cur;
        cur.next = prev;
        prev = cur;
        cur = next;
        i++;
    }
    start.next = prev;
    tail.next = cur;
    return left === 1 ? prev : head;
};

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

function toArray(head) {
    const res = [];
    let curr = head;
    while (curr) {
        res.push(curr.val);
        curr = curr.next;
    }

    return res;
}

assert.deepEqual(toArray(reverseBetween(list, 1, 4)), [4, 3, 2, 1, 5]);
