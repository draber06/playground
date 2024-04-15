import assert from "assert";
import TreeNode from "./treeNode";

// Path Sum
// From leetcode https://leetcode.com/problems/path-sum/description/

//  recursive approach
const hasPathSum = (root, targetSum) => {
    if (!root) return false;
    const remains = targetSum - root.val;
    if (remains === 0 && !root.left && !root.right) return true;

    return hasPathSum(root.left, remains) || hasPathSum(root.right, remains);
};

// iterative approach
const hasPathSumIterative = (root, targetSum) => {
    if (!root) return false;
    const sums = [root.val];
    const nodes = [root];

    while (nodes.length) {
        const node = nodes.pop();
        const sumVal = sums.pop();

        if (!node.left && !node.right && targetSum === sumVal) {
            return true;
        }
        if (node.left) {
            nodes.push(node.left);
            sums.push(sumVal + node.left.val);
        }
        if (node.right) {
            nodes.push(node.right);
            sums.push(sumVal + node.right.val);
        }
    }

    return false;
};

const tree = new TreeNode(
    5,
    new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
    new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
);
const tree2 = new TreeNode(-2, null, new TreeNode(-3));

assert.equal(hasPathSumIterative(tree, 22), true);
assert.equal(hasPathSumIterative(null, 0), false);
assert.equal(hasPathSumIterative(tree2, -5), true);
