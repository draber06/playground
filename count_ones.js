import assert from "assert";

// '1111111' 7
const countOnes = str => {
    let maxCount = 0;
    let currentCount = 0;

    for (const ch of str) {
        if (ch === "1") {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }

    return maxCount;
};

assert.equal(countOnes("10101010111101001111111"), 7);
assert.equal(countOnes("00001010000"), 1);
assert.equal(countOnes("11111"), 5);
