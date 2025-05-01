import assert from "assert";

// Реализовать
function add(a) {
    if (!a) return 0;

    return b => {
        if (!b) return a;

        return add(a + b);
    };
}

assert.equal(add(9)(10)(), 19);
assert.equal(add(9)(), 9);
assert.equal(add(), 0);
