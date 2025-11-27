import assert from "assert";

function rle(str) {
    let result = "";
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            result += str[i - 1] + (count > 1 ? count : "");
            count = 1;
        }
    }
    return result;
}

assert.equal(rle("A"), "A");
assert.equal(rle("AAAB"), "A3B");
assert.equal(rle("ABCCC"), "ABC3");
