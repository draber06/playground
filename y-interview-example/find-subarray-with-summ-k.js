import assert from "assert";

function findSubarrayWithSum(arr, k) {
    let l = 0;
    let r = 0;
    let currSum = 0;

    while (r < arr.length) {
        currSum += arr[r];

        while (currSum > k) {
            currSum -= arr[l++];
        }

        if (currSum === k) {
            return arr.slice(l, r + 1);
        }
        r++;
    }

    return null;
}

function findSubarrayWithSumAdvanced(arr, k) {
    const prefixMap = new Map();
    let currSum = 0;

    for (let i = 0; i < arr.length; i++) {
        currSum += arr[i];

        if (currSum === k) {
            return [0, i];
        }

        const target = currSum - k;
        if (prefixMap.has(target)) {
            return [prefixMap.get(target) + 1, i];
        }

        if (!prefixMap.has(currSum)) {
            prefixMap.set(currSum, i);
        }
    }
}

assert.deepEqual(findSubarrayWithSum([3, 2, 1, 1, 4, 5, 6], 10), [1, 4, 5]);

assert.deepEqual(findSubarrayWithSumAdvanced([10, 2, -2, -20, 10], -10), [10, 2, -2, -20]);
