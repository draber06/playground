import assert from "assert";

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = function (ransomNote, magazine) {
  if (ransomNote.length > magazine.length) return false;

  const map = {};

  for (let i = 0; i < magazine.length; i++) {
    const letter = magazine[i];

    map[letter] = map[letter] ? map[letter] + 1 : 1;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const letter = ransomNote[i];
    if (!map[letter]) return false;

    map[letter] -= 1;
  }

  return true;
};

assert.equal(canConstruct("aa", "aab"), true);
