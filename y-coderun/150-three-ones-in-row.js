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
    const n = parseInt(inputData[0], 10);
    const result = countSeq(n);
    console.log(result);
});

function countSeq(n) {
    const dp = Array(n).fill(0);
    dp[0] = 2
    dp[1] = 4
    dp[2] = 7

    for (let i = 3; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    return dp[n - 1];
}

function countSeqR(n) {
    const dp = Array(n).fill(0);

    function f(n) {
        if (n === 1) return 2;
        if (n === 2) return 4;
        if (n === 2) return 7;
        if (dp[n] !== 0) return dp[n];
        return (dp[n] = f(n - 1) + f(n - 2) + f(n - 3));
    }

    return f(n);
}
