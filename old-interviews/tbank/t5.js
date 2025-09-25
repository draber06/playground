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

    function traversePath(index, value) {
        if (index >= segments.length) {
            return value
        }
        const currentSegment = segments[index];
        if (currentSegment === "*") {
            if (Array.isArray(value)) {
                return value.flatMap(v => traversePath(index + 1, v));
            } else if (value && typeof value === "object") {
                return Object.values(value).flatMap(v => traversePath(index + 1, v));
            }
            return [];
        }
        if (value == null) {
            return [];
        }
        return traversePath(index + 1, value[currentSegment]);
    }

    return traversePath(0, object);
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
