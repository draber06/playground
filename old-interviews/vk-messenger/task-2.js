import assert from "assert";

function flatR1(arr) {
    return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatR1(v) : v), []);
}

function flatR2(arr) {
    let result = [];

    for (const v of arr) {
        if (Array.isArray(v)) {
            result = result.concat(flatR2(v));
        } else {
            result.push(v);
        }
    }
    return result;
}

function iterativeFlat(arr) {
    const stack = [...arr];
    const result = [];

    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            result.push(next);
        }
    }

    return result.reverse();
}

assert.deepEqual(flatR1([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
assert.deepEqual(flatR2([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
assert.deepEqual(iterativeFlat([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
