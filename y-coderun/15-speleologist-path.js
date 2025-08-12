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
    const n = Number(inputData[0]);
    const blocks = [];

    for (let i = 2; i < inputData.length; i += n + 1) {
        const level = inputData.slice(i, i + n);
        blocks.push(level);
    }

    const result = findPath(n, blocks);

    console.log(result);
});

function isValidPosition(x, y, z, n, visited, blocks) {
    return (
        x >= 0 &&
        x < n &&
        y >= 0 &&
        y < n &&
        z >= 0 &&
        z < n &&
        !visited[z][y][x] &&
        blocks[z][y][x] === "."
    );
}

const steps = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
];

function findPath(n, blocks) {
    let s = [0, 0, 0];
    for (let z = 0; z < n; z++) {
        for (let y = 0; y < n; y++) {
            const x = blocks[z][y].indexOf("S");
            if (x !== -1) {
                s = [x, y, z];
            }
        }
    }

    let head = 0;
    const queue = [s];
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Array(n).fill(false))
    );

    const distances = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Array(n).fill(0))
    );

    while (head < queue.length) {
        const [x, y, z] = queue[head++];
        if (z === 0 && blocks[z][y][x] === ".") {
            return distances[z][y][x];
        }

        for (const [dx, dy, dz] of steps) {
            const nx = x + dx;
            const ny = y + dy;
            const nz = z + dz;

            if (isValidPosition(dx, dy, dz, visited, blocks)) {
                visited[nz][ny][nx] = true;
                distances[nz][ny][nx] = distances[z][y][x] + 1;
                queue.push([nx, ny, nz]);
            }
        }
    }

    return 0;
}
