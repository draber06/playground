import assert from "assert";
// Отсортируйте нечетные числа так, чтобы четные числа остались на своих местах:
//Time  O (n*log(n))
//Space O(n)
function sortOddNumbers(input) {
    const oddNumbers = input.filter(n => n % 2 !== 0).sort((a, b) => a - b);
    let oddIndex = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] % 2 !== 0) {
            input[i] = oddNumbers[oddIndex++];
        }
    }

    return input;
}

assert.deepEqual(sortOddNumbers([5, 4, 1, 6, 3, 8]), [1, 4, 3, 6, 5, 8]);
