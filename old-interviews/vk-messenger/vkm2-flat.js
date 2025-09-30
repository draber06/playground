import assert from "assert";

function flat(arr) {}

function iterativeFlat(arr) {}

assert.deepEqual(flat([1, 2, 3, [4, 5, [6, 7, 8, [9]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
