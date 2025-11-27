import assert from "assert";

const obj = {
    a: {
        b: {
            c: "d",
        },
        e: "f",
    },
};

// Time O(d), where d is number of segments
function get(obj, path) {
    const segments = path.split(".");

    function traverse(value, index) {
        if (index >= segments.length) {
            return value;
        }

        const segment = segments[index];

        if (value[segment] == null) {
            return undefined;
        }

        return traverse(value[segment], index + 1);
    }

    return traverse(obj, 0);
}

function getDfsIterative(obj, path) {
    const segments = path.split(".");
    let head = 0;
    let value = obj;

    while (head < segments.length) {
        const segment = segments[head++];

        const nextValue = value[segment];
        if (nextValue == null) {
            return undefined;
        }
        value = nextValue;
    }

    return value;
}

assert.deepEqual(getDfsIterative(obj, "a.b"), { c: "d" });
assert.equal(getDfsIterative(obj, "a.b.x"), undefined);
