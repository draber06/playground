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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// const addTwoNumbers = (l1, l2) => {
//     const res = {};
//     let resCurr = res;

//     let curr1 = l1;
//     let curr2 = l2;
//     let q = 0;
//     while (curr1 && curr2) {
//         const sum = curr2.val + curr1.val;
//         resCurr.val = (sum % 10) + q;
//         resCurr.next = {};
//         resCurr = resCurr.next;
//         q = sum >= 10 ? 1 : 0;
//         curr1 = curr1.next;
//         curr2 = curr2.next;
//     }
//     if (curr1) {
//         resCurr.next = curr1;
//     }

//     if (curr2) {
//         resCurr.next = curr2;
//     }

//     return res;
// };

// TODO: simplify, try to use one cycle
const addTwoNumbers = (l1, l2) => {
    const l = new ListNode(0);
    let head = l;

    let curr1 = l1;
    let curr2 = l2;
    let q = 0;

    let sum = 0;

    while (curr1 || curr2 || sum) {
        if (curr1) {
            sum += curr1.val;
            curr1 = curr1.next;
        }

        if (curr2) {
            sum += curr2.val;
            curr2 = curr2.next;
        }
        if (sum >= 10) {
            q = 1;
            sum -= 10;
        }

        head.next = new ListNode(sum);
        head = head.next;
        sum = q;
        q = 0;
    }

    return l.next;
};

const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

const l3 = new ListNode(7);
l3.next = new ListNode(0);
l3.next.next = new ListNode(8);

assert.deepEqual(addTwoNumbers(l1, l2), l3);

const l4 = new ListNode(9);
l4.next = new ListNode(9);
l4.next.next = new ListNode(9);
l4.next.next.next = new ListNode(9);
l4.next.next.next.next = new ListNode(9);
l4.next.next.next.next.next = new ListNode(9);
l4.next.next.next.next.next.next = new ListNode(9);

const l5 = new ListNode(9);
l5.next = new ListNode(9);
l5.next.next = new ListNode(9);
l5.next.next.next = new ListNode(9);

const l6 = new ListNode(8);
l6.next = new ListNode(9);
l6.next.next = new ListNode(9);
l6.next.next.next = new ListNode(9);
l6.next.next.next.next = new ListNode(0);
l6.next.next.next.next.next = new ListNode(0);
l6.next.next.next.next.next.next = new ListNode(0);
l6.next.next.next.next.next.next.next = new ListNode(1);

assert.deepEqual(addTwoNumbers(l4, l5), l6);

const l7 = new ListNode(2);
l7.next = new ListNode(4);
l7.next.next = new ListNode(9);

const l8 = new ListNode(5);
l8.next = new ListNode(6);
l8.next.next = new ListNode(4);
l8.next.next.next = new ListNode(9);

const l9 = new ListNode(7);
l9.next = new ListNode(0);
l9.next.next = new ListNode(4);
l9.next.next.next = new ListNode(0);
l9.next.next.next.next = new ListNode(1);

// assert.deepEqual(addTwoNumbers(l7, l8), l9);
