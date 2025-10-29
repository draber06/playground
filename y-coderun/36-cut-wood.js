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
    const [l, n] = inputData[0].split(" ").map(Number);
    const cuts = inputData[1].split(" ").map(Number);

    const result = calcMinSum(l, cuts);

    console.log(result);
});

function calcMinSum(l, cuts) {
    const normalizedCuts = [0, ...cuts, l];
    const n = normalizedCuts.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let len = 2; len < n; len++) {
        for (let i = 0; i + len < n; i++) {
            const j = i + len;
            let minCost = Infinity;
            for (let k = i + 1; k < j; k++) {
                minCost = Math.min(minCost, dp[i][k] + dp[k][j]);
            }
            dp[i][j] = normalizedCuts[j] - normalizedCuts[i] + minCost;
        }
    }

    return dp[0][n - 1];
}
