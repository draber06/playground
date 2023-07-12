import assert from "assert";

class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = (root) => {
    if (!root) return [];

    let queue = [root];
    let shouldChangeDirection = false;
    const res = [];

    while (queue.length) {
        const values = [];
        const temp = [];
        while (queue.length) {
            const node = queue.shift();
            if (shouldChangeDirection) {
                values.unshift(node.val);
            } else {
                values.push(node.val);
            }
            node.left && temp.push(node.left);
            node.right && temp.push(node.right);
        }
        res.push(values);
        queue = temp;
        shouldChangeDirection = !shouldChangeDirection;
    }

    return res;
};

const tree = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, null, new TreeNode(5))
);

const tree2 = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

// assert.deepEqual(zigzagLevelOrder(tree), [[1], [3, 2], [4, 5]]);
assert.deepEqual(zigzagLevelOrder(tree2), [[3], [20, 9], [15, 7]]);
