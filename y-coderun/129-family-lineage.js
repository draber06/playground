import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = [];

rl.on("line", line => {
    data.push(line.trim());
});

rl.on("close", () => {
    const n = parseInt(data[0], 10);
    const pairs = {};

    for (let i = 1; i < n; i++) {
        const [child, parent] = data[i].split(" ");
        pairs[child] = parent;
    }

    const result = findLineage(n, pairs);
    for (const line of Object.entries(result)) {
        console.log(line.join(" "));
    }
});

function findLineage(n, pairs) {
    const result = {};
    for (const child in pairs) {
        let parent = pairs[child];
        result[child] = 0;
        if (!result[parent]) {
            result[parent] = 0;
        }
        while (parent) {
            result[child]++;
            parent = pairs[parent];
        }
    }

    return Object.keys(result)
        .sort()
        .reduce((acc, key) => {
            acc[key] = result[key];
            return acc;
        }, {});
}
