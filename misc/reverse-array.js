import assert from "assert";

const reverse = (nums) => {
  let i = 0;
  let j = nums.length - 1;

  while (i < j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
    i++;
    j--;
  }
};

const array = [-1, -100, 3, 99, 100];
reverse(array);
assert.deepEqual(array, array.reverse());
