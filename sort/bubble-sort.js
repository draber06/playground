import assert from "assert";

function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }

    return arr;
}

assert.deepEqual(
    bubbleSort([2, 9, 3, 1, 6, 6, 5, 8, 7, 17, 3, 4]),
    [1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 17]
);
