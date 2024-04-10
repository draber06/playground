import assert from "assert";

function compareVersions(v1, v2) {
    const version1 = v1.split(".");
    const version2 = v2.split(".");

    for (let i = 0; i < version1.length; i++) {
        const diff = Number(version1[i]) - Number(version2[i]);
        if (diff > 0) {
            return 1;
        }

        if (diff < 0) {
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
