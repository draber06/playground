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

    const sequence = lines[1].split(" ").map(Number);
    console.log(...mergeSort(sequence));
});

function mergeLists(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i), right.slice(j));
}

function mergeSort(sequence) {
    if (sequence.length <= 1) {
        return sequence;
    }

    const mid = Math.floor(sequence.length / 2);
    const left = mergeSort(sequence.slice(0, mid));
    const right = mergeSort(sequence.slice(mid));

    return mergeLists(left, right);
}

assert.deepEqual(mergeSort([13, 17, 37, 73, 31, 19, 23]), [13, 17, 37, 73, 31, 19, 23].toSorted());
