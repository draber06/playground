import assert from "assert";

function compareVersions(v1, v2) {
    if (v1 === v2) return 0;

    const v1Segments = v1.split(".");
    const v2Segments = v2.split(".");

    while (v1Segments.length || v2Segments.length) {
        const v1Segment = Number(v1Segments.shift() ?? 0);
        const v2Segment = Number(v2Segments.shift() ?? 0);
        if (v1Segment > v2Segment) {
            return 1;
        } else if (v1Segment < v2Segment) {
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
