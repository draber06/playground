import assert from "assert";

function isMonotonic(arr) {
    let increasing = false;
    let decreasing = false;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) increasing = true;
        if (arr[i] > arr[i + 1]) decreasing = true;

        if (increasing && decreasing) return false;
    }

    return true;
}

assert.equal(isMonotonic([1, 2, 3, 6]), true);
assert.equal(isMonotonic([6, 3, 3, 2, 1]), true);
assert.equal(isMonotonic([1, 1, 1]), true);
assert.equal(isMonotonic([1, 10, 6]), false);
