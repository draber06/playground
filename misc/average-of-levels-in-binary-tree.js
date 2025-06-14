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
const traverse = (root, level, ans) => {
  if (!root) return;
  if (!ans[level]) {
    ans[level] = {
      nodeCount: 0,
      sum: 0,
    };
  }
  ans[level].nodeCount++;
  ans[level].sum += root.val;

  traverse(root.left, level + 1, ans);
  traverse(root.right, level + 1, ans);
};
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const averageOfLevels = (root) => {
  const level = 0;
  const ans = [
    {
      nodeCount: 1,
      sum: root.val,
    },
  ];

  traverse(root.left, level + 1, ans);
  traverse(root.right, level + 1, ans);

  return ans.map(({ nodeCount, sum }) => (sum / nodeCount).toFixed(5));
};

const tree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

assert.deepEqual(averageOfLevels(tree), [3.0, 14.5, 11.0]);
