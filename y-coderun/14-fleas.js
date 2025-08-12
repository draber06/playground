import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let inputData = [];

rl.on("line", line => {
    inputData.push(line.trim());
});

rl.on("close", () => {
    const [n, m, s, t, q] = inputData[0].split(" ").map(Number);

    const positions = [];
    for (let i = 1; i <= q; i++) {
        const position = inputData[i].split(" ").map(Number);
        positions.push(position);
    }
    const result = findMinSumPath(n, m, s, t, q, positions);

    console.log(result);
});

function findMinSumPath(n, m, s, t, q, positions) {
    const startY = s - 1;
    const startX = t - 1;

    const distances = Array.from({ length: n }, () => Array(m).fill(0));
    const visited = Array.from({ length: n }, () => Array(m).fill(false));

    const queue = [[startY, startX]];
    visited[startY][startX] = true;

    const jumps = [
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
    ];

    let head = 0;
    while (head < queue.length) {
        const [y, x] = queue[head++];
        for (const [dy, dx] of jumps) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[ny][nx]) {
                visited[ny][nx] = true;
                distances[ny][nx] = distances[y][x] + 1;
                queue.push([ny, nx]);
            }
        }
    }

    let minPathSum = 0;
    for (const [y, x] of positions) {
        const ny = y - 1;
        const nx = x - 1;
        if (!visited[ny][nx]) {
            return -1;
        }
        minPathSum += distances[ny][nx];
    }

    return minPathSum;
}
