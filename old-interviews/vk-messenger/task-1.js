import assert from "assert";

function compareVersions(v1, v2) {}

assert.equal(compareVersions("2.0", "1.0"), 1);
assert.equal(compareVersions("1.0", "2.0"), -1);
assert.equal(compareVersions("1.0", "1.0"), 0);
assert.equal(compareVersions("1.1.2", "1.12"), -1);
assert.equal(compareVersions("1.0.1", "1.0.0"), 1);
assert.equal(compareVersions("1.01", "1.1"), 0);
assert.equal(compareVersions("1.0", "1.0.0.0"), 0);
