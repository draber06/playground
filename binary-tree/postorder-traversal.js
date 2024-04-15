import assert from "assert";

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Binary Tree Postorder Traversal
// From leetcode https://leetcode.com/problems/binary-tree-postorder-traversal/

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
const postorderTraversal = (root) => {
  if (!root) return [];

  const res = [];

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);
    traverse(node.right);
    res.push(node.val);
  };
  traverse(root);
  return res;
};

// iterative

const postorderTraversal2 = function (root) {
  if (!root) return [];

  const stack = [root];
  const res = [];

  while (stack.length) {
    const node = stack[stack.length - 1];
    if (node.left) {
      stack.push(node.left);
      j;
      node.left = null;
    } else if (node.right) {
      stack.push(node.right);
      node.right = null;
    } else res.push(stack.pop().val);
  }
  return res;
  // Time Complexity: O(n)
  // Space Complexity: O(n)
};

const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
const tree2 = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
);

const tree3 = new TreeNode(3, new TreeNode(1), new TreeNode(2));

assert.deepEqual(postorderTraversal2(tree), [3, 2, 1]);
// assert.deepEqual(postorderTraversal2(tree2), [7, 2, 11, 4, 13, 1, 4, 8, 5]);
// assert.deepEqual(postorderTraversal2(tree3), [1, 2, 3]);
