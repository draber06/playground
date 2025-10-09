import assert from "assert";

/*
 * Дан массив целых неотрицательных чисел, нужно сгруппировать друг с другом числа,
 * которые можно получить путем перестановки цифр, их составляющих,
 * нули при этом игнорируем, так как нет числа 011.
 * Решение должно быть максимально эффективно по памяти и времени
 * */

// O(n * d)
function permutations(arr) {
    const dict = new Map();

    for (const n of arr) {
        const freq = Array(10).fill(0);
        let x = n;

        while (x) {
            const r = x % 10;
            if (r > 0) {
                freq[r]++;
            }
            x = Math.floor(x / 10);
        }

        const key = freq.toString();

        let nums = dict.get(key);
        if (!nums) {
            nums = [];
            dict.set(key, nums);
        }
        nums.push(n);
    }

    return [...dict.values()];
}

console.log("start test");
assert.deepEqual(permutations([1230, 99, 23001, 123, 111, 300021, 101010, 90000009, 9]), [
    [1230, 23001, 123, 300021],
    [99, 90000009],
    [111, 101010],
    [9],
]);
assert.deepEqual(permutations([11, 22]), [[11], [22]]);
assert.deepEqual(permutations([11111111112, 1222222222]), [[11111111112], [1222222222]]);
console.log("end test");
