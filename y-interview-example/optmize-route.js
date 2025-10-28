import assert from "assert";

const directionsMap = {
    R: [1, 0],
    L: [-1, 0],
    D: [0, -1],
    U: [0, 1],
};

function optimizeRoute(directions) {
    let x = 0;
    let y = 0;

    const visited = new Set([`${x},${y}`]);
    const optimizedRoute = [];

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        optimizedRoute.push(direction);

        const [dx, dy] = directionsMap[direction];
        x += dx;
        y += dy;

        const newPoint = `${x},${y}`;

        if (visited.has(newPoint)) {
            while (optimizedRoute.length) {
                const prevDir = optimizedRoute.pop();
                const [prevDx, prevDy] = directionsMap[prevDir];
                x -= prevDx;
                y -= prevDy;

                const prevPoint = `${x},${y}`;
                if (prevPoint === newPoint) break;
                visited.delete(prevPoint);
            }
        } else {
            visited.add(newPoint);
        }
    }

    return optimizedRoute;
}

assert.deepEqual(optimizeRoute(["R", "D", "L", "U", "R"]), ["R"]);
assert.deepEqual(optimizeRoute(["R", "D", "L", "R", "U", "U", "R"]), ["R", "U", "R"]);
