import assert from "assert";

/* 
	Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

	In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

	Example 1:

	Input: rowIndex = 3
	Output: [1,3,3,1]
	Example 2:

	Input: rowIndex = 0
	Output: [1]
	Example 3:

	Input: rowIndex = 1
	Output: [1,1]
	

	Constraints:

	0 <= rowIndex <= 33
*/

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
const getRow = rowIndex => {
    const result = new Array(rowIndex + 1).fill(1);

    for (let i = 1; i < rowIndex + 1; i++) {
        const prevRow = result.slice(0, i);

        for (let j = 1; j < prevRow.length; j++) {
            result[j] = prevRow[j - 1] + prevRow[j];
        }
    }

    return result;
};

assert.deepStrictEqual(getRow(3), [1, 3, 3, 1]);
assert.deepStrictEqual(getRow(0), [1]);
assert.deepStrictEqual(getRow(1), [1, 1]);
