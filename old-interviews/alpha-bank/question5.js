import assert from "assert";
// Дать сдачу
function getMoney(amount, cashbox) {}

assert.deepEqual(getMoney(6200, { 5000: 0, 1000: 7, 100: 5 }), {
    5000: 0,
    1000: 6,
    100: 2,
});

assert.deepEqual(getMoney(6200, { 5000: 0, 1000: 4, 100: 5 }), {
    5000: 0,
    1000: 6,
    100: 2,
});
// assert.deepEqual(getMoney(6201), error);
