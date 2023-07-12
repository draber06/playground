import assert from "assert";
import TreeNode from "./treeNode";

// Balanced Binary Tree
// From leetcode https://leetcode.com/problems/balanced-binary-tree/

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
 * @return {boolean}
 */

// 1. Если дерева нет, то вернуть false
// 2. Посчитать высоту левого поддерева и вычесть высоту правого поддерева
// 3. Если больше одного, то вернуть false (не сбалансировано)
// 4. Вернуть true -> сбалансировано

const height = (root) => {
  if (!root) return 0;

  return Math.max(height(root.left), height(root.right)) + 1;
};

const isBalanced = (root) => {
  if (!root) return true;

  const lh = height(root.left);
  const rh = height(root.right);

  return (
    Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right)
  );
};

const tree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(17))
);

assert.equal(isBalanced(tree, 22), true);
