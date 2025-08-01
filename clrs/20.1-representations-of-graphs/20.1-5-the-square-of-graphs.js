import assert from "assert";

function squareAdjListGraph(graph) {
    const squaredGraph = {};

    for (const u in graph) {
        const neighbors = new Set();

        for (const v of graph[u]) {
            if (graph[v]) {
                for (const w of graph[v]) {
                    neighbors.add(w);
                }
            }
        }
        squaredGraph[u] = Array.from(neighbors);
    }

    return squaredGraph;
}

function squareAdjMatrixGraph(matrix) {
    const v = matrix.length;
    const squaredGraph = Array.from({ length: v }, () => Array(v).fill(0));

    for (let u = 0; u < matrix.length; u++) {
        for (let v = 0; v < matrix.length; v++) {
            if (matrix[u][v] === 0) continue;
            for (let w = 0; w < matrix.length; w++) {
                if (matrix[v][w] === 0) continue;
                squaredGraph[u][w] = 1;
            }
        }
    }

    return squaredGraph;
}

function convertToAdjMatrix(g) {
    const v = Object.keys(g).length;
    const matrix = Array.from({ length: v }, () => Array(v).fill(0));

    for (const u in g) {
        for (const v of g[u]) {
            matrix[u - 1][v - 1] = 1;
        }
    }
    return matrix;
}

// adjacency-list
const adjList = {
    1: [2, 4],
    2: [5],
    3: [6, 5],
    4: [2],
    5: [4],
    6: [6],
};

assert.deepEqual(squareAdjListGraph(adjList), {
    1: [5, 2],
    2: [4],
    3: [6, 4],
    4: [5],
    5: [2],
    6: [6],
});

assert.deepEqual(squareAdjMatrixGraph(convertToAdjMatrix(adjList)), [
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
]);
