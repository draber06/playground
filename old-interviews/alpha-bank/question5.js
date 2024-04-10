import assert from "assert";

function getMoney(amount, cashbox) {
    const nominals = Object.keys(cashbox).sort((a, b) => b - a);
    const change = {};

    let currentAmount = amount;
    let currentNominalIdx = 0;

    while (currentAmount && currentNominalIdx < nominals.length) {
        const currentNominal = nominals[currentNominalIdx];
        const numberOfBanknotes = Math.min(
            Math.floor(currentAmount / currentNominal),
            cashbox[currentNominal]
        );
        change[currentNominal] = numberOfBanknotes;

        currentNominalIdx++;
        currentAmount -= numberOfBanknotes * currentNominal;
    }

    if (currentAmount) {
        throw new Error("Извините, нет сдачи :(");
    }

    return change;
}

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
