import assert from "assert";

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
const wordPattern = (pattern, s) => {
    const words = s.split(" ");
    if (words.length !== pattern.length) return false;

    const dictByPattern = {};
    const dictByWord = {};

    for (let i = 0; i < pattern.length; i++) {
        if (!Object.hasOwn(dictByPattern, pattern[i])) {
            dictByPattern[pattern[i]] = words[i];
        }

        if (!Object.hasOwn(dictByWord, words[i])) {
            dictByWord[words[i]] = pattern[i];
        }

        if (dictByPattern[pattern[i]] !== words[i] || dictByWord[words[i]] !== pattern[i]) {
            return false;
        }
    }

    return true;
};

assert.equal(wordPattern("abba", "dog dog dog dog"), false);
assert.equal(wordPattern("aaaa", "dog cat cat dog"), false);
assert.equal(wordPattern("abba", "dog cat cat dog"), false);
