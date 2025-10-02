import assert from "assert";

// Реализовать
function add(a) {
    if (a === undefined) {
        return 0;
    }
    return b => {
        if (b === undefined) {
            return a;
        }
        return add(a + b);
    };
}

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...next) => curried(...args, ...next);
    };
}

assert.equal(add(9)(10)(), 19);
assert.equal(add(9)(), 9);
assert.equal(add(), 0);
