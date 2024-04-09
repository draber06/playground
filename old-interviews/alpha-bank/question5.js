import assert from "assert";

function getMoney(amount) {
    const nominals = [5000, 1000, 500, 100, 50];
    const change = nominals.reduce((acc, currentNominal) => {
        acc[currentNominal] = 0;
        return acc;
    }, {});

    let currentAmount = amount;
    let currentNominalIdx = 0;

    while (currentAmount && currentNominalIdx < nominals.length) {
        const currentNominal = nominals[currentNominalIdx];
        const numberOfBanknotes = Math.floor(currentAmount / currentNominal);
        change[currentNominal] = numberOfBanknotes;

        currentNominalIdx++;
        currentAmount -= numberOfBanknotes * currentNominal;
    }

    if (currentAmount) {
        throw new Error("Извините, нет сдачи :(");
    }

    return change;
}

assert.deepEqual(getMoney(6200), { 5000: 1, 1000: 1, 500: 0, 100: 2, 50: 0 });
// assert.deepEqual(getMoney(6201), error);
