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
    const words = [];

    for (const line of inputData) {
        if (line) {
            words.push(...line.split(/\s+/));
        }
    }
    const result = countFreq(words);
    console.log(result.join(" "));
});

// Time O(n)
// Space O(n)
function countFreq(words) {
    const dict = new Map(); // Space O(n)
    const result = []; // Space O(n)

    // Time O(n)
    for (let i = 0; i< words.length; i++) {
        const word = words[i]
        result.push(dict.get(word) ?? 0); // Time O(1)
        dict.set(word, (dict.get(word) ?? 0) + 1); // Time O(1) + O(1)
    }

    return result;
}
