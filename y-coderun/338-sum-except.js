import assert from "node:assert";

function sumExcept(a, i, n) {
    if (i < 0 || !Number.isInteger(i)) {
        i = 0;
    }

    if (n < 0 || !Number.isInteger(n)) {
        n = 0;
    }
    let result = 0;

    for (let j = 0; j < i; j++) {
        if (Number.isInteger(a[j])) {
            result += a[j];
        }
    }

    for (let j = i + n; j < a.length; j++) {
        if (Number.isInteger(a[j])) {
            result += a[j];
        }
    }

    return result;
}

assert.equal(sumExcept([1, 9, 8, 4], 1, 2), 5);
