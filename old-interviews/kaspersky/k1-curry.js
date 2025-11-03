import assert from "assert";

// Реализовать
function add(a) {
    if (a === undefined) return 0;

    return b => (b === undefined ? a : add(a + b));
}

assert.equal(add(9)(10)(), 19);
assert.equal(add(9)(), 9);
assert.equal(add(), 0);
