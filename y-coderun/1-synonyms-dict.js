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
    const n = parseInt(inputData[0], 10);
    const word = inputData.at(-1);
    const pairs = {};

    for (let i = 1; i < n + 1; i++) {
        const [k, v] = inputData[i].split(" ");
        pairs[k] = v;
        pairs[v] = k;
    }

    console.log(pairs[word]);
});
