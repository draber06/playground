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
 * @return {string[]}
 */
function helper(root, stack, res) {
  if (!root) return;

  stack.push(root.val);

  // if this is a node leaf
  if (!root.left && !root.right) {
    res.push(stack.slice().join("->"));
    stack.pop();
    return;
  }

  helper(root.left, stack, res);
  helper(root.right, stack, res);
  stack.pop();
}

const sumOfLeftLeaves = (root, left = false) => {
  if (!root.left && !root.right && left) {
    return root.val;
  }

  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right, false);
};

function binaryTreePaths(root) {
  if (!root) return [];

  const res = [];

  const stack = [];

  helper(root, stack, res);
  return res;
}

const tree = new TreeNode(
  1,
  new TreeNode(2, null, new TreeNode(5)),
  new TreeNode(3)
);
const tree2 = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),

  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
);
// [5,4,8,11,null, 13, 4, 7,2, null,null,null, 1]

const tree3 = new TreeNode(3, new TreeNode(1), new TreeNode(2));

// assert.deepEqual(
//   invertTree(tree),
//   new TreeNode(1, new TreeNode(2, null, new TreeNode(3)))
// );
assert.deepEqual(binaryTreePaths(tree), ["1->2->5", "1->3"]);
// assert.deepEqual(postorderTraversal2(tree3), [1, 2, 3]);
