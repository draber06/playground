import assert from "node:assert/strict";
// 1. Реализовать функцию getMoney для банкомата, выдающего купюры.
// На вход - сумма, на выходе объект с количеством купюр по каждому номиналу.
// Доступные номиналы: 50, 100, 500, 1000, 5000 р

// 2. На входе добавляется объект с текущим количеством купюр в банкомате

function getMoney(amount, limits = {}) {
    const nominals = [5000, 1000, 500, 100, 50];
    const change = nominals.reduce((acc, nominal) => ({ ...acc, [nominal]: 0 }), {});
    let currentNominalPos = 0;
    let currentAmount = amount;

    while (currentAmount > 0 && currentNominalPos < nominals.length) {
        const nominal = nominals[currentNominalPos];
        const banknoteCount = Math.floor(currentAmount / nominal);
        change[nominal] = banknoteCount;

        currentAmount -= banknoteCount * nominal;
        currentNominalPos++;
    }

    if (currentAmount) {
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
