import assert from "assert";
/*
	Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

	For example:

	A -> 1
	B -> 2
	C -> 3
	...
	Z -> 26
	AA -> 27
	AB -> 28 
	...
	

	Example 1:

	Input: columnNumber = 1
	Output: "A"
	Example 2:

	Input: columnNumber = 28
	Output: "AB"
	Example 3:

	Input: columnNumber = 701
	Output: "ZY"
	

	Constraints:

	1 <= columnNumber <= 2^31 - 1 
 */

const ALPHABET_LENGTH = 26;
/**
 * @param {number} columnNumber
 * @return {string}
 */
const convertToTitle = columnNumber => {
    let res = "";

    while (columnNumber > 0) {
        columnNumber--;
        res = String.fromCharCode((columnNumber % ALPHABET_LENGTH) + "A".charCodeAt(0)) + res;
        columnNumber = Math.floor(columnNumber / ALPHABET_LENGTH);
    }

    return res;
};

// assert.equal(convertToTitle(1), "A");
// assert.equal(convertToTitle(28), "AB");
assert.equal(convertToTitle(29), "AC");
// assert.equal(convertToTitle(701), "ZY");
