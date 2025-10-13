import assert from "assert";

// Функция поиска вариантов перелётов из точки
function fetchFlights(from) {
    return Promise.resolve("hey");
}

//  Функция поиска составного авиабилета

const graph = {
    A: ["B", "D"],
    B: ["C", "N", "Z"],
    D: ["E", "F"],
    F: ["S"],
};

async function findPathDfs(from, to, fetchFlights) {
    const stack = [[from, [from]]];
    const visited = new Set();

    while (stack.length) {
        const [point, path] = stack.pop();
        if (point === to) {
            return path;
        }

        const destinations = await fetchFlights(point);

        for (const destination of destinations) {
            if (!visited.has(destination)) {
                visited.add(destination);
                stack.push([destination, path.concat(destination)]);
            }
        }
    }

    throw new Error("No way");
}

async function findPathBfs(from, to, fetchFlights) {
    const queue = [[from, [from]]];
    const visited = new Set([from]);
    let head = 0;

    while (head < queue.length) {
        const [point, path] = queue[head++];
        if (point === to) {
            return path;
        }
        const destinations = await fetchFlights(point);

        for (const destination of destinations) {
            if (!visited.has(destination)) {
                visited.add(destination);
                queue.push([destination, path.concat(destination)]);
            }
        }
    }

    throw new Error("No way");
}

assert.equal(findPath("A", "N", fetchFlights), ["A"]);
