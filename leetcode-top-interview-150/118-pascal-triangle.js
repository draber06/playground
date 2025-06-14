import assert from "assert";
/* 
	Given an integer numRows, return the first numRows of Pascal's triangle.

	In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

	Example 1:

	Input: numRows = 5
	Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
	Example 2:

	Input: numRows = 1
	Output: [[1]]
	

	Constraints:

	1 <= numRows <= 30 
*/

/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = numRows => {
    const result = [[1]];

    for (let i = 1; i < numRows; i++) {
        const prevRow = result[result.length - 1];

        const newRow = [];
        newRow.push(1);

        for (let j = 1; j < prevRow.length; j++) {
            newRow[j] = prevRow[j - 1] + prevRow[j];
        }
        newRow.push(1);
        result.push(newRow);
    }

    return result;
};

const generateRecursive = numRows => {
    if (numRows === 1) {
        return [[1]];
    }

    const prevRows = generateRecursive(numRows - 1);
    const newRow = [];

    const prevRow = prevRows[prevRows.length - 1];
    newRow.push(1);

    for (let j = 1; j < prevRow.length; j++) {
        newRow[j] = prevRow[j - 1] + prevRow[j];
    }

    newRow.push(1);
    prevRows.push(newRow);

    return prevRows;
};

assert.deepStrictEqual(generateRecursive(2), [[1], [1, 1]]);
assert.deepStrictEqual(generateRecursive(3), [[1], [1, 1], [1, 2, 1]]);
assert.deepStrictEqual(generateRecursive(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
assert.deepStrictEqual(generateRecursive(1), [[1]]);
