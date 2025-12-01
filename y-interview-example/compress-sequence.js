/*  Дан список целых чисел, повторяющихся элементов в списке нет.
    Нужно преобразовать это множество в строку,
    сворачивая соседние по числовому ряду числа в диапазоны.
 */

// Time - O(n*log(n))
// Space - O(n)
function compress(list) {
    list.sort((a, b) => a - b);

    let start = list[0];

    const result = [];

    for (let i = 1; i <= list.length; i++) {
        if (list[i] !== list[i - 1] + 1) {
            result.push(start === list[i - 1] ? `${start}` : `${start}-${list[i - 1]}`);
            start = list[i];
        }
    }

    return result.join(",");
}

// Time - O(n*log(n))
// Space - O(n)
function compressFunctionalStyle(list) {
    return list
        .toSorted((a, b) => a - b)
        .reduce((acc, current) => {
            const currentPair = acc.at(-1);

            if (currentPair && currentPair[1] + 1 === current) {
                currentPair[1] = current;
            } else {
                acc.push([current, current]);
            }

            return acc;
        }, [])
        .map(([start, end]) => (start === end ? start : `${start}-${end}`))
        .join(",");
}

console.clear();
check(compress([1, 4, 5, 2, 3, 9, 8, 11, 0]), "0-5,8-9,11");
check(compress([1, 4, 3, 2]), "1-4");
check(compress([1, 4]), "1,4");
check(compress([1, 2]), "1-2");

function check(input, expected) {
    console.assert(
        input === expected,
        `Test case %o: expected %o, but got %o`,
        expected,
        expected,
        input
    );
}

console.log("Tests finished");
