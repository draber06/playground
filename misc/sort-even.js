/*
    На вход подается массив произвольный массив чисел, напишите функцию,
    которая отсортирует нечетные числа, а четные оставит на своих местах
*/
// sortEven([2, 9, 5, 7, 4, 3, 8, 1, 2, 4]);

import assert from "assert";

function sortEven(arr) {
    const odd = arr.filter((elem) => elem % 2 !== 0).sort((a, b) => b - a);

    const res = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            res[i] = odd.pop();
        } else {
            res[i] = arr[i];
        }
    }

    return res;
}

// assert.deepEqual(
//     sortEven([2, 9, 5, 7, 4, 3, 8, 1, 2, 4]),
//     [2, 9, 5, 7, 4, 3, 8, 1, 2, 4]
// );

console.log(sortEven([2, 9, 5, 7, 4, 3, 8, 1, 2, 4]));
// assert.deepEqual(sortEven([3, 2, 1, 4]), [1, 2, 3, 4]);
