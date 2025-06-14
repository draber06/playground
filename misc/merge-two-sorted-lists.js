import assert from "assert";

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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = (list1, list2) => {
    const mergedList = { next: null };
    let cur = mergedList;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 || list2;

    return mergedList.next;
};

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);

const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

const list3 = new ListNode(1);
list3.next = new ListNode(1);
list3.next.next = new ListNode(2);
list3.next.next.next = new ListNode(3);
list3.next.next.next.next = new ListNode(3);
list3.next.next.next.next = new ListNode(4);

assert.deepEqual(mergeTwoLists(list1, list2), list3);
