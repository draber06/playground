import assert from "assert";

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = (nums) => {
    if (nums.length < 2) return nums;

    const pivot = nums[0];
    const left = [];
    const right = [];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > pivot) {
            right.push(nums[i]);
        } else {
            left.push(nums[i]);
        }
    }

    return [...sortArray(left), pivot, ...sortArray(right)];
};
const binarySearch = (nums, target, r, l) => {
    if (r >= l) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return mid;

        if (nums[mid] > target) {
            return binarySearch(nums, target, l, mid - 1);
        }
        return binarySearch(nums, target, mid + 1, r);
    }
    return -1;
};

const binarySearch2 = (nums, target) => {
    let l = 0;
    let r = nums.length - 1;
    let mid;
    while (l <= r) {
        mid = Math.floor(l + Math.floor((r - l) / 2));
        if (nums[mid] === target) return mid;

        if (nums[mid] > target) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
};

const merge = (left, right) => {
    const sorted = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }

    return sorted.concat(left, right);
};

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

assert.deepEqual(binarySearch2([5, 2, 3, 1], 2), 1);
