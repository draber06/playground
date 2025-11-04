import assert from "assert";

const data = {
    albums: [
        {
            name: "AM",
            group: "Arctic Monkeys",
        },
        {
            name: "Nevermind",
            group: "Nirvana",
        },
        {
            name: "Mezzanine",
            group: "Massive Attack",
        },
        {
            name: "OK Compture",
            group: "Radiohead",
        },
        {
            name: "Currents",
            group: "Tame Impala",
        },
    ],
    artists: [
        { name: "Arctic Monkeys" },
        { name: "Nirvana" },
        { name: "Massive Attack" },
        { name: "Radiohead" },
        { name: "Tame Impala" },
    ],
};

// TODO: Реализуйте эту функцию
function search(path, object) {
    const segments = path.split(".");
    let queue = [{ value: object, index: 0 }];
    const results = [];

    let head = 0;

    while (head < queue.length) {
        const { value, index } = queue[head++];

        if (index >= segments.length) {
            results.push(value);
            continue;
        }

        const segment = segments[index];

        if (segment === "*") {
            if (Array.isArray(value)) {
                for (const item of value) {
                    queue.push({ value: item, index: index + 1 });
                }
            } else if (value && typeof value === "object") {
                for (const item of Object.values(value)) {
                    queue.push({ value: item, index: index + 1 });
                }
            }
        } else {
            if (value?.[segment] !== undefined && value[segment] !== null) {
                queue.push({ value: value[segment], index: index + 1 });
            }
        }
    }

    return results;
}

assert.deepEqual(search("albums.0.name", data), ["AM"]);
assert.deepEqual(search("artists.3.name", data), ["Radiohead"]);
assert.deepEqual(search("albums.*.name", data), [
    "AM",
    "Nevermind",
    "Mezzanine",
    "OK Compture",
    "Currents",
]);
assert.deepEqual(search("albums.*.*", data), [
    "AM",
    "Arctic Monkeys",
    "Nevermind",
    "Nirvana",
    "Mezzanine",
    "Massive Attack",
    "OK Compture",
    "Radiohead",
    "Currents",
    "Tame Impala",
]);
