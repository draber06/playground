import assert from "assert";

function createTournament(names, pairs) {
    const tournament = names.reduce((acc, name) => ({ ...acc, [name]: [] }), {});
    for (const [a, b] of pairs) {
        tournament[a].push(b);
        tournament[b].push(a);
    }

    const colors = {};

    for (const wrestler of names) {
        if (!Object.hasOwn(colors, wrestler)) {
            const queue = [];
            queue.push(wrestler);
            colors[wrestler] = 0;

            while (queue.length) {
                const current = queue.shift();
                for (const neighbour of tournament[current]) {
                    if (!Object.hasOwn(colors, neighbour)) {
                        colors[neighbour] = 1 - colors[current];
                        queue.push(neighbour);
                    } else if (colors[neighbour] === colors[current]) {
                        return {
                            hasSolution: false,
                            solution: null,
                        };
                    }
                }
            }
        }
    }

    const solution = Object.entries(colors).reduce(
        (acc, [w, color]) => {
            if (color === 0) {
                acc.faces.push(w);
            } else {
                acc.heels.push(w);
            }
            return acc;
        },
        { faces: [], heels: [] }
    );

    return { hasSolution: true, solution };
}

const names = ["bill", "john", "willy", "connie", "biden", "trump"];
const pairs = [
    ["bill", "john"],
    ["john", "willy"],
    ["willy", "connie"],
    ["connie", "biden"],
    ["biden", "trump"],
];

assert.deepEqual(createTournament(names, pairs), {
    hasSolution: true,
    solution: {
        faces: ["bill", "willy", "biden"],
        heels: ["john", "connie", "trump"],
    },
});
