import assert from "assert";

function flat(arr) {
    return arr.reduce(
        (acc, current) => acc.concat(Array.isArray(current) ? flat(current) : current),
        []
    );
}

function iterativeFlat(arr) {
    const stack = [...arr];
    const result = [];

    while (stack.length) {
        const element = stack.pop();
        if (Array.isArray(element)) {
            stack.push(...element);
        } else {
            result.push(element);
        }
    }

    return result.reverse();
}

assert.deepEqual(flat([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
