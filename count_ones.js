import assert from "assert";

// '1111111' 7
const countOnes = str => {
    let maxCount = 0;
    let currentMaxCount = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i - 1] === str[i]) {
            currentMaxCount++;
        } else {
            maxCount = Math.max(currentMaxCount, maxCount);
            currentMaxCount = 1;
        }
    }

    maxCount = Math.max(currentMaxCount, maxCount);
    return maxCount;
};

assert.equal(countOnes("10101010111101001111111"), 7);
