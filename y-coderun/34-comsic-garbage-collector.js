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
    const [N, S, W, E, U, D, commandRule] = inputData;
    const rules = { N, S, W, E, U, D };
    const command = commandRule.split(" ");
    const startDirection = command[0];
    const startSteps = parseInt(command[1], 10);

    const result = countMoves(rules, startDirection, startSteps);
    console.log(result);
});

function countMoves(rules, startDirection, startSteps) {
    let dp = { [startDirection]: 1 };
    let moveCount = 0;

    for (let step = 1; step <= startSteps; step++) {
        let nextDp = {};

        for (const [dir, ways] of Object.entries(dp)) {
            moveCount += ways;

            if (step < startSteps) {
                for (const nextDir of rules[dir] || []) {
                    nextDp[nextDir] = (nextDp[nextDir] || 0) + ways;
                }
            }
        }
        dp = nextDp;
    }

    return moveCount;
}

function countMovesMemo(rules, startDirection, startSteps) {
    const memo = new Map();

    function helper(direction, steps) {
        if (steps < 1) return 0;

        const key = direction + "-" + steps;
        if (memo.has(key)) return memo.get(key);

        let count = 1;

        if (steps > 1) {
            for (const nextDirection of rules[direction] || []) {
                count += helper(nextDirection, steps - 1);
            }
        }

        memo.set(key, count);
        return count;
    }

    return helper(startDirection, startSteps);
}
