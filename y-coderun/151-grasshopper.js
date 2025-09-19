import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    inputData.push(line.trim());
});

rl.on("close", () => {
    const [n, k] = inputData[0].split(" ").map(v => parseInt(v, 10));
    const result = countWays(n, k);
    console.log(result);
});

function countWays(n, k) {
    const ways = Array(n).fill(0);
    ways[0] = 1;

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k; j++) {
            if (i - j >= 0) {
                ways[i] += ways[i - j];
            }
        }
    }
    return ways[n - 1];
}
