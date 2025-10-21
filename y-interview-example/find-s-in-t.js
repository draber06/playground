import assert from "assert";

const getCount = str => {
    const count = {};
    for (let ch of str) {
        count[ch] = (count[ch] || 0) + 1;
    }
    return count;
};

// Проверка равенства двух счетчиков
function isEqual(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (let key of aKeys) {
        if (a[key] !== b[key]) return false;
    }
    return true;
}

function findPermutation(T, S) {
    const lenS = S.length;
    const lenT = T.length;

    if (lenS > lenT) return -1;

    const sCount = getCount(S);
    let windowCount = getCount(T.slice(0, lenS));

    // Проверяем первое окно
    if (isEqual(sCount, windowCount)) return 0;

    for (let i = lenS; i < lenT; i++) {
        const newChar = T[i];
        const oldChar = T[i - lenS];

        windowCount[newChar] = (windowCount[newChar] || 0) + 1;
        windowCount[oldChar]--;

        if (windowCount[oldChar] === 0) delete windowCount[oldChar];

        if (isEqual(sCount, windowCount)) return i - lenS + 1;
    }

    return -1;
}

const CHAR_COUNT = 26;

function getCharPos(char) {
    return char.charCodeAt(0) - "a".charCodeAt(0);
}

// Time - O(n)
// Space - O(1)
function findPermutationOptimized(t, s) {
    const lenS = s.length;
    const lenT = t.length;

    if (lenS > lenT) return -1;

    const sCount = Array(CHAR_COUNT).fill(0); // Space - O(1)
    const windowCount = Array(CHAR_COUNT).fill(0); // Space - O(1)

    // Time - O(lenS)
    for (let i = 0; i < lenS; i++) {
        sCount[getCharPos(s[i])]++;
        windowCount[getCharPos(t[i])]++;
    }

    let diff = 0;
    // Time - O(1)
    for (let i = 0; i < CHAR_COUNT; i++) {
        if (sCount[i] !== windowCount[i]) diff++;
    }
    if (diff === 0) return 0;

    // Time - O(n)
    for (let i = lenS; i < lenT; i++) {
        const newChar = getCharPos(t[i]);
        const oldChar = getCharPos(t[i - lenS]);

        if (windowCount[oldChar] === sCount[oldChar]) diff++;
        windowCount[oldChar]--;
        if (windowCount[oldChar] === sCount[oldChar]) diff--;

        if (windowCount[newChar] === sCount[newChar]) diff++;
        windowCount[newChar]++;
        if (windowCount[newChar] === sCount[newChar]) diff--;

        if (diff === 0) return i - lenS + 1;
    }

    return -1;
}
//
assert.deepEqual(findPermutationOptimized("abacadbt", "caa"), 2);
