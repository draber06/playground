import assert from "assert";

function merge(l, r) {
    const sortedArray = [];

    while (l.length && r.length) {
        if (l[0] < r[0]) {
            sortedArray.push(l.shift());
        } else {
            sortedArray.push(r.shift());
        }
    }

    return [...sortedArray, ...l, ...r];
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

assert.deepEqual(
    mergeSort([2, 9, 3, 1, 6, 6, 5, 8, 7, 17, 3, 4]),
    [1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 17]
);
