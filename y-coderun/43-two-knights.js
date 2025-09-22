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
    const [redKnightPos, greenKnightPos] = inputData[0].split(" ");
    const filesMap = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
    };
    const red = [filesMap[redKnightPos[0]], parseInt(redKnightPos[1], 10) - 1];
    const green = [filesMap[greenKnightPos[0]], parseInt(greenKnightPos[1], 10) - 1];

    const result = countMinSteps1(red, green);
    console.log(result);
});

const moves = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [-1, -2],
    [1, -2],
];

// O(n^4)
function countMinSteps1(redPos, greenPos) {
    if ((redPos[0] + redPos[1]) % 2 !== (greenPos[0] + greenPos[1]) % 2) {
        return -1;
    }
    if (redPos[0] === greenPos[0] && redPos[1] === greenPos[1]) return 0;

    const visited = new Set();

    const queue = [[redPos[0], redPos[1], greenPos[0], greenPos[1], 0]];
    visited.add(`${redPos[0]}-${redPos[1]}-${greenPos[0]}-${greenPos[1]}`);

    while (queue.length > 0) {
        const [rx, ry, gx, gy, moveCount] = queue.shift();

        for (let [dxR, dyR] of moves) {
            const newRx = rx + dxR;
            const newRy = ry + dyR;
            if (newRx < 0 || newRx > 7 || newRy < 0 || newRy > 7) continue;

            for (let [dxG, dyG] of moves) {
                const newGx = gx + dxG;
                const newGy = gy + dyG;
                if (newGx < 0 || newGx > 7 || newGy < 0 || newGy > 7) continue;

                if (newRx === newGx && newRy === newGy) return moveCount + 1;

                const key = `${newRx}-${newRy}-${newGx}-${newGy}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push([newRx, newRy, newGx, newGy, moveCount + 1]);
                }
            }
        }
    }

    return -1;
}

function bfs(x, y) {
    const dist = Array.from({ length: 8 }, () => Array(8).fill(Infinity));
    const queue = [[x, y]];
    dist[y][x] = 0;

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of moves) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[ny][nx] === Infinity) {
                dist[ny][nx] = dist[y][x] + 1;
                queue.push([nx, ny]);
            }
        }
    }

    return dist;
}

// O(n^2)
function countMinSteps(red, green) {
    const distRed = bfs(red[0], red[1]);
    const distGreen = bfs(green[0], green[1]);
    if ((red[0] + red[1]) % 2 !== (green[0] + green[1]) % 2) {
        return -1;
    }

    let minMoves = Infinity;
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const movesNeeded = Math.max(distRed[y][x], distGreen[y][x]);
            if (movesNeeded < minMoves) {
                minMoves = movesNeeded;
            }
        }
    }

    return minMoves === Infinity ? -1 : minMoves;
}
