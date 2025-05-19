import assert from "node:assert";

let inputData = "";

process.stdin.setEncoding("utf-8");

process.stdin.on("data", chunk => {
    inputData += chunk;
});

process.stdin.on("end", () => {
    const lines = inputData
        .trim()
        .split("\n")
        .map(line => line.trim());

    let currentLine = 0;

    const n = parseInt(lines[currentLine++], 10);
    const testCases = [];

    for (let t = 0; t < n; t++) {
        const m = parseInt(lines[currentLine++], 10);
        const sequence = lines[currentLine++].split(" ").map(Number);
        testCases.push(sequence);
    }

    console.log(...mergeSort(testCases));
});

function merge(left, right) {
    const sortedList = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            sortedList.push(left[i]);
            i++;
        } else {
            sortedList.push(right[j]);
            j++;
        }
    }

    return sortedList.concat(left.slice(i), right.slice(j));
}

function mergeSort(sortedSequences) {
    if (sortedSequences.length === 0) {
        return [];
    }
    if (sortedSequences.length === 1) {
        return sortedSequences[0];
    }

    const mid = Math.floor(sortedSequences.length / 2);
    const left = mergeSort(sortedSequences.slice(0, mid));
    const right = mergeSort(sortedSequences.slice(mid));

    return merge(left, right);
}

assert.deepEqual(
    mergeSort([
        [1, 2, 3],
        [1, 2],
        [3, 5, 6, 7],
    ]),
    [1, 1, 2, 2, 3, 3, 5, 6, 7]
);
