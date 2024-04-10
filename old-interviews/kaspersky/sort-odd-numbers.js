import assert from "assert";
// Отсортируйте нечетные числа так, чтобы четные числа остались на своих местах:

function sortOddNumbers(input) {
    const indices = [];
    input
        .filter((v, i) => v % 2 && indices.push(i))
        .sort((a, b) => a - b)
        .forEach((v, i) => {
            input[indices[i]] = v;
        });

    return input;
}

assert.deepEqual(sortOddNumbers([5, 4, 1, 6, 3, 8]), [1, 4, 3, 6, 5, 8]);

// console.log(sortOddNumbers(input))
