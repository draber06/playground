import assert from "assert";

function compareVersions(v1, v2) {
    const stack1 = v1.split(".");
    const stack2 = v2.split(".");

    while (stack1.length || stack2.length) {
        const p1 = parseInt(stack1.shift() ?? "0", 10);
        const p2 = parseInt(stack2.shift() ?? "0", 10);

        if (p1 > p2) {
            return 1;
        } else if (p1 < p2) {
            return -1;
        }
    }

    return 0;
}

assert.equal(compareVersions("2.0", "1.0"), 1);
assert.equal(compareVersions("1.0", "2.0"), -1);
assert.equal(compareVersions("1.0", "1.0"), 0);
assert.equal(compareVersions("1.1.2", "1.12"), -1);
assert.equal(compareVersions("1.0.1", "1.0.0"), 1);
assert.equal(compareVersions("1.01", "1.1"), 0);
assert.equal(compareVersions("1.0", "1.0.0.0"), 0);
