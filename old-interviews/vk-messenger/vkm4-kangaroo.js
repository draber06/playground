import assert from "assert";

function kangaroo(x0, v0, x1, v1) {
    if (v0 === v1) {
        return x0 === x1 ? 0 : false;
    }

    const t = (x1 - x0) / (v0 - v1);

    return t >= 0 && Number.isInteger(t) ? (t === 0 ? 0 : 1) : false;
}

assert.equal(kangaroo(2, 3, 0, 5), 1);
assert.equal(kangaroo(2, 3, 2, 5), 0);
assert.equal(kangaroo(2, 3, 2, 3), 0);
assert.equal(kangaroo(2, 3, 3, 3), false);
assert.equal(kangaroo(2, 4, 3, 3), 1);
assert.equal(kangaroo(2, 3, 0, 1), false);
assert.equal(kangaroo(5, 5, 5, 5), 0);
