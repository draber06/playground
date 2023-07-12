import assert from "assert";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = (nums, k) => {
  if (!k || nums.length === 1) return;

  const tail = nums.splice(-k % nums.length);
  nums.unshift(...tail);
};

// it works but inefficient
const rotate2 = (nums, k) => {
  if (!k) return;

  let i = k;
  while (i--) {
    nums.unshift(nums.pop());
  }
};

const rotate3 = (nums, k) => {
  k %= nums.length; // if k is greater than nums.length then one cycle is completed that means it will remain the same and we have to remainder shifts

  const reverse = (i, j) => {
    while (i < j) {
      // [nums[i], nums[j]] =[nums[j], nums[i]]
      const temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      i++;
      j--;
    }
  }; // suppose  ----->--->
  reverse(0, nums.length - 1); // reverse   <--<------
  reverse(0, k - 1); // reverse first part ---><----
  reverse(k, nums.length - 1); // reverse second part --->----->
};

const array = [-1, -100, 3, 99];
rotate(array, 2);
assert.deepEqual(array, [3, 99, -1, -100]);
