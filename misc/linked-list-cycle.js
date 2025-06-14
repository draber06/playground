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
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = head => {
    let current = head;
    let fast = current;

    while (fast && fast.next) {
        current = current.next;
        fast = fast.next.next;
        if (fast === current) return true;
    }

    return false;
};

const list = new ListNode(3);
list.next = new ListNode(2);
list.next.next = new ListNode(0);
list.next.next.next = new ListNode(4);
list.next.next.next.next = list.next;

assert.equal(hasCycle(list), true);
