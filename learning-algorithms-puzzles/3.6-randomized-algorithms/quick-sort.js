import assert from "node:assert";

let inputData = "";

process.stdin.setEncoding("utf-8");

process.stdin.on("data", chunk => {
    inputData += chunk;
});

process.stdin.on("end", () => {
    const lines = inputData.trim().split("\n");
    const seq = lines[1].trim().split(" ").map(Number);

    console.log(...quickSort(seq));
});

function partition(array, start, stop) {
    const randomPivot = Math.floor(Math.random() * (stop - start + 1)) + start;

    [array[start], array[randomPivot]] = [array[randomPivot], array[start]];

    const pivot = start;
    let smallEnd = start + 1;

    for (let i = start + 1; i <= stop; i++) {
        if (array[i] <= array[pivot]) {
            [array[smallEnd], array[i]] = [array[i], array[smallEnd]];
            smallEnd++;
        }
    }

    [array[pivot], array[smallEnd - 1]] = [array[smallEnd - 1], array[pivot]];
    return smallEnd - 1;
}

function quickSort(array, start = 0, stop = array.length - 1) {
    if (start < stop) {
        let pivotIndex = partition(array, start, stop);
        quickSort(array, start, pivotIndex - 1);
        quickSort(array, pivotIndex + 1, stop);
    }

    return array;
}

assert.deepEqual(quickSort([13, 17, 37, 73, 31, 19, 23]), [13, 17, 37, 73, 31, 19, 23].toSorted());
