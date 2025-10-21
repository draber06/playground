import assert from "assert";

class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
// 700. Search in a Binary Search Tree
// https://leetcode.com/problems/search-in-a-binary-search-tree/description/?envType=problem-list-v2&envId=binary-search-tree
const searchBST = function (root, val) {
    if (!root) {
        return null;
    }

    if (root.val === val) return root;

    return searchBST(root.left) || searchBST(root.right);
};

const tree = new TreeNode(5, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7));

assert.deepEqual(searchBST(tree, 2), tree.left);
// assert.deepEqual(postorderTraversal2(tree3), [1, 2, 3]);
