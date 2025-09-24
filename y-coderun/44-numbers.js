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
    const [n1, n2] = inputData.map(n => parseInt(n, 10));
    const result = generateSequence(n1, n2);

    for (const n of result) {
        console.log(n);
    }
});

function getNeighbours(n) {
    const neighbours = [];
    const firstDigit = Math.floor(n / 1000);
    const lastDigit = n % 10;

    if (firstDigit < 9) {
        neighbours.push(n + 1000);
    }

    if (lastDigit > 1) {
        neighbours.push(n - 1);
    }

    neighbours.push((n % 1000) * 10 + firstDigit);
    neighbours.push(Math.floor(n / 10) + lastDigit * 1000);

    return neighbours;
}

// O(k), where k - sequence length
function generateSequence(start, end) {
    const queue = [start];
    const history = new Set(); // O(k)
    history.add(start);
    const prev = new Map(); // O(k) - one parent for node

    let i = 0;
    while (i < queue.length) {
        const node = queue[i++];
        if (node === end) {
            break;
        }

        const neighbours = getNeighbours(node);
        neighbours.forEach(neighbour => {
            if (!history.has(neighbour)) {
                history.add(neighbour);
                prev.set(neighbour, node);
                queue.push(neighbour);
            }
        });
    }

    const result = [end];
    let current = end;

    while (current !== start) {
        const parent = prev.get(current);
        result.push(parent);
        current = parent;
    }

    return result.reverse();
}