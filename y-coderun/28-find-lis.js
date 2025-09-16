import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", data => {
    inputData.push(data.trim());
});

rl.on("close", () => {
    const n = Number(inputData[0].trim());
    const array = inputData[1].split(" ").map(Number);

    const result = findLIS(n, array);
    console.log(...result);
});

function findLIS(n, array) {
    const dp = Array(n).fill(1);
    const parent = Array(n).fill(-1);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (array[j] < array[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
    }

    let maxIdx = 0;
    for (let i = 1; i < dp.length; i++) {
        if (dp[i] > dp[maxIdx]) {
            maxIdx = i;
        }
    }

    const lis = [];
    let idx = maxIdx;
    while (idx !== -1) {
        lis.unshift(array[idx]);
        idx = parent[idx];
    }

    return lis;
}
