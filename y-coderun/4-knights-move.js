import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on("line", line => {
    input.push(line.trim());
});

rl.on("close", () => {
    const [n, m] = input[0].split(" ").map(Number);

    const routes = countKnightMoves(n, m);
    console.log("-----", "routes", routes);
});

function countKnightMoves(n, m) {
    const dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0));

    dp[1][1] = 1;

    for (let x = 1; x <= n; x++) {
        for (let y = 1; y <= m; y++) {
            if (x - 1 >= 1 && y - 2 >= 1) {
                dp[x][y] += dp[x - 1][y - 2];
            }

            if (x - 2 >= 1 && y - 1 >= 1) {
                dp[x][y] += dp[x - 2][y - 1];
            }
        }
    }

    return dp[n][m]
}
