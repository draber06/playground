import assert from "assert";

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Binary Tree Preorder Traversal
// From leetcode https://leetcode.com/problems/binary-tree-preorder-traversal/

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
 * @return {number[]}
 */
const preorderTraversal = (root) => {
  if (!root) return [];

  const res = [];

  const traverse = (node) => {
    if (!node) return;

    res.push(node.val);
    traverse(node.left);
    traverse(node.right);
  };
  traverse(root);
  return res;
};

// iterative
const preorderTraversal2 = (root) => {
  if (!root) return [];
  const res = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);

    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }

  return res;
};

const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));

assert.deepEqual(preorderTraversal2(tree), [1, 2, 3]);
