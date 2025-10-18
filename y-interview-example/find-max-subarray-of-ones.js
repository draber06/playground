import assert from "assert";

function findMaxSubarrayOfOnes(nums) {
    let maxLen = 0;
    let left = 0;
    let zeros = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;

        while (zeros > 1) {
            if (nums[left] === 0) zeros--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left);
    }

    return maxLen;
}

assert.equal(findMaxSubarrayOfOnes([0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1]), 5);
assert.equal(findMaxSubarrayOfOnes([1, 1, 1]), 2);
