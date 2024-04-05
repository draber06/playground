import assert from "assert";

const factorial = n => {
    if (n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
};

const countCombinations = (n, k) => {
    return factorial(n) / (factorial(k) * factorial(n - k));
};

// assert.equal(countCombinations(3, 2), 3);
assert.equal(countCombinations(7, 5), 21);
