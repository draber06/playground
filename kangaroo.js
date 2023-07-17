import assert from "assert";

function kangaroo(x1, v1, x2, v2) {
    const deltaS = x1 - x2;
    const deltaV = v2 - v1;

    if (deltaV === 0) return false;

    const t = deltaS / deltaV;
    return t > 0 ? t : false;
}

assert.equal(kangaroo(2, 3, 0, 5), 1);

assert.equal(kangaroo(2, 3, 0, 5), 1);
assert.equal(kangaroo(2, 3, 2, 5), 0);
assert.equal(kangaroo(2, 3, 2, 3), 0);
assert.equal(kangaroo(2, 3, 3, 3), false);
assert.equal(kangaroo(2, 4, 3, 3), 1);
assert.equal(kangaroo(2, 3, 0, 1), false);
assert.equal(kangaroo(5, 5, 5, 5), 0);
assert.equal(kangaroo(0, 1, 5, 0), 5);
assert.equal(kangaroo(0, 1, 1e500, 0), 1e500);
