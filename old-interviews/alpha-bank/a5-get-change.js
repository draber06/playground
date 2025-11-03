import assert from "node:assert/strict";
// 1. Реализовать функцию getMoney для банкомата, выдающего купюры.
// На вход - сумма, на выходе объект с количеством купюр по каждому номиналу.
// Доступные номиналы: 50, 100, 500, 1000, 5000 р

// 2. На входе добавляется объект с текущим количеством купюр в банкомате

function getMoney(amount, limits = {}) {
    const denominations = [5000, 1000, 500, 100, 50];

    const change = Object.fromEntries(denominations.map(d => [d, 0]));

    let remaining = amount;

    for (const denom of denominations) {
        const available = limits[denom] ?? Infinity;
        const count = Math.min(Math.floor(remaining / denom), available);
        change[denom] = count;
        remaining -= count * denom;
    }

    if (remaining) {
        throw new Error("Нет сдачи");
    }

    return change;
}

assert.deepEqual(getMoney(6200), { 5000: 1, 1000: 1, 500: 0, 100: 2, 50: 0 });

assert.throws(() => getMoney(20), /Нет сдачи$/);

assert.deepEqual(getMoney(6200, { 5000: 0, 1000: 7, 100: 5 }), {
    5000: 0,
    1000: 6,
    500: 0,
    100: 2,
    50: 0,
});
