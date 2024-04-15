import assert from "assert";

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}

assert.deepEqual(
    quickSort([2, 9, 3, 1, 6, 6, 5, 8, 7, 17, 3, 4]),
    [1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 17]
);
