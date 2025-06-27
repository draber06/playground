import assert from "assert";

//  O(n*log(n))
function findSum(nums, k) {
    nums.sort((a, b) => a - b); // O(n*log(n))

    let l = 0;
    let r = nums.length - 1;

    // O(n)
    while (l < r) {
        const sum = nums[l] + nums[r];
        if (sum === k) {
            return true;
        }
        if (sum > k) {
            r--;
        } else {
            l++;
        }
    }
    return false;
}

function findSumHash(nums, k) {
    const differences = {}; // O(n) - memory

    // O(n) - time
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] in differences) {
            return true;
        }

        differences[k - nums[i]] = true;
    }

    return false;
}

assert.equal(findSumHash([10, 15, 3, 7], 17), true);
