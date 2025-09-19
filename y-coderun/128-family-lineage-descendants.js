import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on("line", line => {
    input.push(line.trim());
});

rl.on("close", () => {
    const N = input[0];
    const children = new Map();
    const allNames = new Set();
    const hasParent = new Set();

    for (let i = 1; i < N; i++) {
        const [child, parent] = input[i].split(" ");
        if (!children.has(parent)) children.set(parent, []);
        children.get(parent).push(child);

        allNames.add(child);
        allNames.add(parent);
        hasParent.add(child);
    }

    const root = [...allNames].find(x => !hasParent.has(x));
    const descendants = new Map();

    function dfs(node) {
        let total = 0;
        if (children.has(node)) {
            for (const child of children.get(node)) {
                total += 1 + dfs(child);
            }
        }
        descendants.set(node, total);
        return total;
    }

    dfs(root);

    for (const name of allNames) {
        if (!descendants.has(name)) {
            descendants.set(name, 0);
        }
    }

    const sortedNames = [...allNames].sort();

    for (const name of sortedNames) {
        console.log(name, descendants.get(name));
    }
});
