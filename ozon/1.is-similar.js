import assert from "assert";
import { truncate } from "fs";

// O(n*log(n))
function isSimilarGreedy(arr1, arr2) {
    if (arr1 === arr2) return true;

    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = arr1.toSorted((a, b) => a - b);
    const sortedArr2 = arr2.toSorted((a, b) => a - b);

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

// O(2n)
function isSimilar(arr1, arr2) {
    if (arr1 === arr2) return true;

    if (arr1.length !== arr2.length) {
        return false;
    }

    const freq = new Map();

    // O(n)
    for (const n of arr1) {
        freq.set(n, (freq.get(n) || 0) + 1);
    }

    // (O(n))
    for (const m of arr2) {
        if (!freq.has(m) || freq.get(m) === 0) {
            return false;
        }

        freq.set(m, freq.get(m) - 1);
    }

    return true;
}

assert.equal(isSimilarGreedy([0, 1, 2], [2, 1, 0]), true);
assert.equal(isSimilar([0, 1, 2], [2, 1, 0]), true);
assert.equal(isSimilar([0, 1], [2, 1, 0]), false);
assert.equal(isSimilar([0, 5, 1], [0, 1, 5]), true);
