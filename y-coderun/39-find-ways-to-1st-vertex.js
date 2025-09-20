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
    const [n, m] = inputData[0].split(" ").map(n => parseInt(n, 10));
    const adjList = Array.from({ length: n + 1 }, () => []);

    for (let i = 1; i <= m; i++) {
        const [u, v] = inputData[i].split(" ").map(n => parseInt(n, 10));
        adjList[v].push(u);
    }

    const result = findVertices(n, adjList);
    console.log(...result);
});
// Optimal solution O(n)
function findVertices(n, adjList) {
    const result = [];
    const visited = Array(n + 1).fill(false);
    const stack = [1];
    visited[1] = true;

    while (stack.length > 0) {
        const u = stack.pop();
        for (const v of adjList[u]) {
            if (!visited[v]) {
                visited[v] = true;
                stack.push(v);
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        if (visited[i]) {
            result.push(i);
        }
    }

    return result;
}

// Experiment O(n*(n*m))
function getVerticesReachingOne(n, adjList) {
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (hasPathToOne(i)) {
            result.push(i);
        }
    }

    function hasPathToOne(node) {
        const stack = [node];
        const visited = Array(n + 1).fill(false);
        visited[node] = true

        while (stack.length > 0) {
            const u = stack.pop();
            if (u === 1) {
                return true;
            }
            for (const v of adjList[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    stack.push(v);
                }
            }
        }

        return false;
    }

    return result;
}
