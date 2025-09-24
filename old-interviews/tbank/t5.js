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

    function resolvePath(index, value) {
        if (index >= segments.length) {
            return [value];
        }

        const currentSegment = segments[index];

        if (currentSegment === "*") {
            if (Array.isArray(value)) {
                return value.flatMap(v => resolvePath(index + 1, v));
            } else if (value && value === "object") {
                return Object.values(value).flatMap(v => resolvePath(index + 1, v));
            } else {
                return [];
            }
        }

        if (value == null) return [];

        return resolvePath(index + 1, value[currentSegment]);
    }

    return resolvePath(0, object);
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
