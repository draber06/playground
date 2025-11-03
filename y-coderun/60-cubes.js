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
    const [n, m] = inputData[0].split(" ").map(Number);
    const nCubes = inputData
        .slice(1, n + 1)
        .map(Number)
        .sort((a, b) => a - b);
    const mCubes = inputData
        .slice(n + 1, n + m + 1)
        .map(Number)
        .sort((a, b) => a - b);

    const intersection = new Set();
    const nDiff = new Set();
    const mDiff = new Set();

    let i = 0;
    let j = 0;

    while (i < nCubes.length && j < mCubes.length) {
        if (nCubes[i] === mCubes[j]) {
            intersection.add(nCubes[i]);
            i++;
            j++;
        } else if (nCubes[i] < mCubes[j]) {
            nDiff.add(nCubes[i++]);
        } else {
            mDiff.add(mCubes[j++]);
        }
    }

    while (i < nCubes.length) nDiff.add(nCubes[i++]);
    while (j < mCubes.length) mDiff.add(mCubes[j++]);

    console.log(intersection.size);
    console.log([...intersection].join(" "));

    console.log(nDiff.size);
    console.log([...nDiff].join(" "));

    console.log(mDiff.size);
    console.log([...mDiff].join(" "));
});
