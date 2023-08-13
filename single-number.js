import assert from "assert";
/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = nums => {
    let uniqNum = 0;
    for (let i = 0; i < nums.length; i++) {
        uniqNum ^= nums[i];
    }

    return uniqNum;
};

assert.deepEqual(singleNumber([4, 1, 2, 1, 2]), 4);
