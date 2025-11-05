import assert from "assert";

function flat(arr) {
    return arr.flatMap(v => (Array.isArray(v) ? flat(v) : v));
}

function iterativeFlat(arr) {
    const queue = [arr];
    let head = 0;
    const result = [];

    while (head < queue.length) {
        const v = queue[head++];
        if (Array.isArray(v)) {
            queue.push(...v);
        } else {
            result.push(v);
        }
    }

    return result;
}

assert.deepEqual(iterativeFlat([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// [1, 2, 3, [4, 5, [6, 7, 8, [9]]]]
// [1, 2]
// [1, 2, 3]
// [1, 2, 3] -> flat([4, 5, [6, 7, 8, [9]]])
//              [4]
//              [4, 5]
//              [4, 5] -> flat([6, 7, 8, [9]])
//                        [6]
//                        [6, 7]
//                        [6, 7, 8]
//                        [6, 7, 8] -> flat([9])
//                                     [9]
//                        [6, 7, 8, 9]
//              [4, 5, 6, 7, 8, 9]
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
