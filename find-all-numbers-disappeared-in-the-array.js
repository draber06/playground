import assert from "assert";

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = nums => {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums.indexOf(i + 1) === -1) {
            result.push(i + 1);
        }
    }

    return result;
};

const findDisappearedNumbersOptimal = nums => {
    nums.forEach(n => {
        const realIndex = Math.abs(n) - 1;
        if (nums[realIndex] > 0) {
            nums[realIndex] *= -1;
        }
    });

    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }

    return result;
};

assert.deepEqual(findDisappearedNumbersOptimal([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
