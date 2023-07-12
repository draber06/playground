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
 * @return {TreeNode}
 */
const invertTree = (root) => {
  if (!root) return root;

  const leftS = root.left;

  root.left = invertTree(root.right);
  root.right = invertTree(leftS);

  return root;
};

// iterative

const invertTree2 = (root) => {
  if (!root) return root;

  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    const leftS = node.left;
    const rightS = node.right;

    node.left = rightS;
    node.right = leftS;
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  return root;
};

const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
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
assert.deepEqual(
  invertTree(tree2),
  new TreeNode(
    5,
    new TreeNode(8, new TreeNode(4, new TreeNode(1)), new TreeNode(13)),
    new TreeNode(4, null, new TreeNode(11, new TreeNode(2), new TreeNode(7)))
  )
);
// assert.deepEqual(postorderTraversal2(tree3), [1, 2, 3]);
