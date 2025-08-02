import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on("line", line => {
    input.push(line.trim());
});

rl.on("close", () => {
    const n = Number(input[0]);
    const [v1, v2] = input.at(-1).split(" ").map(Number);

    const matrix = [];

    for (let i = 1; i <= n; i++) {
        const row = input[i].split(" ").map(Number);
        matrix.push(row);
    }

    const result = findShortestPath(n, matrix, v1, v2);
    console.log(result);
});

function findShortestPath(n, matrix, v1, v2) {
    v1--;
    v2--;
    if (v1 === v2) return 0;

    const queue = [];
    queue.push(v1);

    const distance = {};
    distance[v1] = 0;

    while (queue.length) {
        const current = queue.shift();
        for (let v = 0; v < n; v++) {
            const hasEdge = matrix[current][v] === 1;
            if (!Object.hasOwn(distance, v) && hasEdge) {
                distance[v] = distance[current] + 1;
                if (v === v2) {
                    return distance[v];
                }
                queue.push(v);
            }
        }
    }

    return -1;
}
