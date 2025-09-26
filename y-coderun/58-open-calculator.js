import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    inputData.push(line.trim());
});

// Time - O(m)
// Space - O(n + m)
rl.on("close", () => {
    const buttons = new Set(inputData[0].split(" ")); // Space - O(n)
    const number = new Set(inputData[1].split("")); // Space - O(m)

    let missingButtonCount = 0;

    // Time - O(m)
    for (const digit of number) {
        if (!buttons.has(digit)) {
            missingButtonCount++;
        }
    }
    console.log(missingButtonCount);
});

rl.on("close", () => {
    const available = inputData[0].split(" "); // Space - O(n)
    const required = new Set(inputData[1].split("")); // Space - O(m)

    // Time - O(n)
    available.forEach(digit => {
        required.delete(digit);
    });
    console.log(required.size);
});
