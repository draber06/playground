import assert from "assert";
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
    if (!nums1.length) return nums1;
    if (!nums2.length) return nums2;
    nums1.splice(m, n, ...nums2);

    nums1.sort();
};

const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

const res1 = [1, 2, 2, 3, 5, 6];

// console.log(merge([], 0, [1], 1));
assert.deepEqual(merge([0], 0, [1], 1), [1]);
