import assert from "assert";

function flat(arr) {
    return arr.reduce(
        (acc, current) => acc.concat(Array.isArray(current) ? flat(current) : current),
        []
    );
}

function iterativeFlat(arr) {
    const flattened = [...arr];
    let i = 0;
    while (i < flattened.length) {
        if (Array.isArray(flattened[i])) {
            flattened.splice(i, 1, ...flattened[i]);
        } else {
            i++;
        }
    }
    return flattened;
}

assert.deepEqual(flat([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
