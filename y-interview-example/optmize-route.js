import assert from "assert";

const directionsMap = {
    R: [1, 0],
    L: [-1, 0],
    D: [0, -1],
    U: [0, 1],
};

function optimizeRoute(route) {
    const visited = new Set([]);
    let x = 0;
    let y = 0;
    visited.add(`${x}:${y}`);

    const optimizedRoute = [];

    for (let i = 0; i < route.length; i++) {
        const direction = route[i];
        optimizedRoute.push(direction);

        const [dx, dy] = directionsMap[direction];
        x += dx;
        y += dy;
        const to = `${x}:${y}`;

        if (visited.has(to)) {
            while (optimizedRoute.length) {
                const prevDir = optimizedRoute.pop();
                const [prevDx, prevDy] = directionsMap[prevDir];
                x -= prevDx;
                y -= prevDy;
                const prevPos = `${x}:${y}`;
                if (prevPos === to) break;
                visited.delete(prevPos);
            }
        } else {
            visited.add(to);
        }
    }

    return optimizedRoute;
}

assert.deepEqual(optimizeRoute(["R", "D", "L", "U", "R"]), ["R"]);
assert.deepEqual(optimizeRoute(["R", "D", "L", "R", "U", "U", "R"]), ["R", "U", "R"]);
