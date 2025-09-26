import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    inputData.push(line.trim());
});

// Time - O(n+m)
// Space - O(m)
rl.on("close", () => {
    const [genome1, genome2] = inputData;
    const pairs2 = new Set(); //Space -  O(m)

    // Time - O(m) Time
    for (let i = 0; i < genome2.length - 1; i++) {
        pairs2.add(genome2[i] + genome2[i + 1]);
    }

    let degreeOfSimilarity = 0;
    // Time - O(n)
    for (let i = 0; i < genome1.length - 1; i++) {
        if (pairs2.has(genome1[i] + genome1[i + 1])) {
            degreeOfSimilarity++;
        }
    }

    console.log(degreeOfSimilarity);
});
