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
    const keys = path.split(".");
    let current = object;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === "*") {
            if (Array.isArray(current)) {
                current = current.flatMap(c => search(keys.slice(i + 1).join("."), c));
            } else if (typeof current === "object" && current !== null) {
                current = Object.values(current);
            } else {
                current = undefined;
            }

            i++;
        } else {
            current = current[keys[i]];
        }

        if (current === null || current === undefined) {
            break;
        }
    }

    return current;
}

assert.deepEqual(search("albums.0.name", data), "AM");
assert.deepEqual(search("artists.3.name", data), "Radiohead");
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
