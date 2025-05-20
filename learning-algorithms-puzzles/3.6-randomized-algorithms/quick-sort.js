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

function partition(array, left, right) {
    const randomPivot = Math.floor(Math.random() * (right - left + 1)) + left;

    [array[left], array[randomPivot]] = [array[randomPivot], array[left]];

    const pivot = array[left];
    let smallEnd = left;

    for (let i = left + 1; i <= right; i++) {
        if (array[i] < pivot) {
            smallEnd++;
            [array[smallEnd], array[i]] = [array[i], array[smallEnd]];
        }
    }

    [array[left], array[smallEnd]] = [array[smallEnd], array[left]];
    return smallEnd;
}

function quickSort(array, left = 0, right = array.length - 1) {
    if (left < right) {
        let pivotIndex = partition(array, left, right);
        quickSort(array, left, pivotIndex - 1);
        quickSort(array, pivotIndex + 1, right);
    }

    return array;
}

assert.deepEqual(quickSort([13, 17, 37, 73, 31, 19, 23]), [13, 17, 37, 73, 31, 19, 23].toSorted());
