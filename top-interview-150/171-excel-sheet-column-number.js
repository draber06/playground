import assert from "assert";
/* 
	Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.

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

	Input: columnTitle = "A"
	Output: 1
	Example 2:

	Input: columnTitle = "AB"
	Output: 28
	Example 3:

	Input: columnTitle = "ZY"
	Output: 701
	

	Constraints:

	1 <= columnTitle.length <= 7
	columnTitle consists only of uppercase English letters.
	columnTitle is in the range ["A", "FXSHRXW"].
*/

/**
 * @param {string} columnTitle
 * @return {number}
 */
const titleToNumber = columnTitle => {
    const charCodeBase = "A".charCodeAt(0) - 1;
    const n = columnTitle.length;
    let number = 0;

    for (let i = 0; i < n; i++) {
        number += (columnTitle.charCodeAt(i) - charCodeBase) * 26 ** (n - i - 1);
    }

    return number;
};

assert.equal(titleToNumber("A"), 1);
assert.equal(titleToNumber("AB"), 28);
assert.equal(titleToNumber("ZY"), 701);
