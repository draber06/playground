import assert from "assert";

function compareVersions(v1, v2) {
    const str1 = v1.split(".");
    const str2 = v2.split(".");
    const len = Math.max(str1.length, str2.length);

    for (let i = 0; i < len; i++) {
        const part1 = +(str1[i] || 0);
        const part2 = +(str2[i] || 0);

        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
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
