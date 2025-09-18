import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = [];

rl.on("line", input => {
    data.push(input.trim());
});

rl.on("close", () => {
    const [str1, str2] = data;
    const distance = findDistance(str1, str2);

    console.log(distance);
});

// Using only last row and last column
function findDistanceT(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    let v0 = Array.from({ length: n + 1 }, (_, idx) => idx);
    let v1 = Array(n + 1);

    for (let i = 0; i < m; i++) {
        v1[0] = i + 1;

        for (let j = 0; j < n; j++) {
            const deletionCost = v0[j + 1] + 1;
            const insertionCost = v1[j] + 1;
            let substitutionCost = 0;
            if (str1[i] === str2[j]) {
                substitutionCost = v0[j];
            } else {
                substitutionCost = v0[j] + 1;
            }
            v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost);
        }
        [v0, v1] = [v1, v0];
    }

    return v0[n];
}

// Using full matrix
function findDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) matrix[i][0] = i;
    for (let j = 0; j <= n; j++) matrix[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + substitutionCost
            );
        }
    }

    return matrix[m][n];
}
