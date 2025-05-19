import assert from "assert";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.output,
});

const inputLines = [];

rl.on("line", line => {
    inputLines.push(line.trim());

    if (inputLines.length === 2) {
        rl.close();
    }
});

rl.on("close", () => {
    if (inputLines.length) {
        const n = parseInt(inputLines[0], 10);
        const array = inputLines[1].split(" ").map(Number);

        selectionSort(n, array);
    }
});

function selectionSort(n, array) {
    const arrayCopy = [...array];

    for (let i = 0; i < n; i++) {
        let minIndex = i;

        for (let j = i; j < n; j++) {
            if (arrayCopy[j] < arrayCopy[minIndex]) {
                minIndex = j;
            }
        }

        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
    }

    return arrayCopy;
}

assert.deepEqual(
    selectionSort(7, [13, 17, 37, 73, 31, 19, 12]),
    [13, 17, 37, 73, 31, 19, 12].toSorted()
);
