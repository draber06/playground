import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    const l = line.trim();
    if (l) {
        inputData.push(l);
    }
});

rl.on("close", () => {
    const n = parseInt(inputData[0], 10);

    const languages = {};

    const allKnows = new Set();
    const atLeastOneKnows = new Set();

    let i = 1;
    while (i < inputData.length) {
        const languageCount = parseInt(inputData[i], 10);
        i++;
        for (let j = i; j < i + languageCount; j++) {
            const lang = inputData[j];
            const count = (languages[lang] ?? 0) + 1;
            if (count === n) {
                allKnows.add(lang);
            } else {
                atLeastOneKnows.add(lang);
            }
            languages[lang] = count;
        }
        i += languageCount;
    }

    console.log(allKnows.size);
    for (const lang of allKnows) {
        console.log(lang);
    }
    console.log(atLeastOneKnows.size);
    for (const lang of atLeastOneKnows) {
        console.log(lang);
    }
});

//
// rl.on("close", () => {
//     const n = parseInt(inputData[0], 10);
//
//     const languages = [];
//
//     let i = 1;
//     while (i < inputData.length) {
//         const languageCount = parseInt(inputData[i], 10);
//         i++;
//         languages.push(new Set(inputData.slice(i, i + languageCount)));
//         i += languageCount;
//     }
//
//     const allKnows = languages.reduce((all, l) => all.union(l), new Set());
//     console.log(allKnows.size);
//     for (const lang of allKnows) {
//         console.log(lang);
//     }
//
//     const atLeastOneKnows = languages.reduce((all, l) => all.intersection(l), languages[0]);
//     console.log(atLeastOneKnows.size);
//     for (const lang of atLeastOneKnows) {
//         console.log(lang);
//     }
// });
