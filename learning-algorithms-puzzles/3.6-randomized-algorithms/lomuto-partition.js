import assert from "node:assert";

let inputData = "";

process.stdin.setEncoding("utf-8");

process.stdin.on("data", chunk => {
    inputData += chunk;
});

process.stdin.on("end", () => {
    const lines = inputData.trim().split("\n");
    const seq = lines[1].trim().split(" ").map(Number);

    console.log(...lomutoPartition(seq));
});

function lomutoPartition(array) {
    const pivot = array[0];
    let smallEnd = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            smallEnd++;
            [array[smallEnd], array[i]] = [array[i], array[smallEnd]];
        }
    }

    [array[0], array[smallEnd]] = [array[smallEnd], array[0]];

    return array;
}

assert.deepEqual(lomutoPartition([4, 7, 2, 5, 3, 1, 8, 9, 6]), [1, 2, 3, 4, 7, 5, 8, 9, 6]);
