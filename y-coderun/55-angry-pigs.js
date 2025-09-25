import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    const l = line.trim();
    if (l) {
        inputData.push(l);
    }
});

rl.on("close", () => {
    const n = parseInt(inputData[0], 10);
    const coords = [];

    for (let i = 1; i <= n; i++) {
        const pos = inputData[i].split(" ").map(v => parseInt(v, 10));
        coords.push(pos);
    }

    const result = countMinShots(coords);
    console.log(result);
});

// Time - O(n)
// Space - O(n)
function countMinShots(coords) {
    const shotCount = coords.reduce((acc, [x]) => acc.add(x), new Set());
    return shotCount.size;
}
