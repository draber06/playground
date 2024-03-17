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
// const middleNode = head => {
//     let position = 1;
//     let current = head;
//     while (current) {
//         position++;
//         current = current.next;
//     }
//     const middle = position % 2 ? Math.ceil(position / 2) : position / 2 + 1;

//     position = 1;
//     current = head;
//     while (current) {
//         if (middle === position) {
//             return current;
//         }
//         position++;
//         current = current.next;
//     }

//     return current;
// };

const middleNode = head => {
    let current = head;
    let fast = head;

    while (fast && fast.next) {
        current = current.next;
        fast = fast.next.next;
    }

    return current;
};

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next = new ListNode(5);

assert.equal(middleNode(list), list.next.next);
