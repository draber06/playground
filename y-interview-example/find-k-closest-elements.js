import assert from "assert";

function findClosestElements(arr, index, k) {
    const result = [];

    let left = index;
    let right = index + 1;

    const n = arr.length;

    while (result.length < k) {
        if (right >= n) {
            result.push(arr[left--]);
            continue;
        }

        if (left < 0) {
            result.push(arr[right++]);
            continue;
        }

        if (Math.abs(arr[left] - arr[index]) <= Math.abs(arr[right] - arr[index])) {
            result.push(arr[left--]);
        } else {
            result.push(arr[right++]);
        }
    }

    return result;
}

assert.deepEqual(findClosestElements([2, 3, 5, 7, 11], 3, 2), [7, 5]);
