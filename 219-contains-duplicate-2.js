import assert from "assert";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const containsNearbyDuplicate = (nums, k) => {
    const dict = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (i - dict.get(nums[i]) <= k) {
            return true;
        }
        dict.set(nums[i], i);
    }

    return false;
};

// assert.equal(containsNearbyDuplicate([1, 2, 3, 1], 3), true);
assert.equal(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), false);
