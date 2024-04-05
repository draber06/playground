import assert from "assert";

/* 
	Write an algorithm to determine if a number n is happy.

	A happy number is a number defined by the following process:

	Starting with any positive integer, replace the number by the sum of the squares of its digits.
	Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
	Those numbers for which this process ends in 1 are happy.
	Return true if n is a happy number, and false if not.

	

	Example 1:

	Input: n = 19
	Output: true
	Explanation:
	12 + 92 = 82
	82 + 22 = 68
	62 + 82 = 100
	12 + 02 + 02 = 1
	Example 2:

	Input: n = 2
	Output: false
	

	Constraints:

	1 <= n <= 231 - 1
*/

/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = n => {
    const seen = {};

    while (n > 1 && !seen[n]) {
        seen[n] = true;

        let total = 0;

        while (n > 0) {
            total += (n % 10) ** 2;
            n = Number.parseInt(n / 10);
        }
        n = total;
    }

    return n === 1;
};

assert.equal(isHappy(19), true);
assert.equal(isHappy(2), false);
assert.equal(isHappy(7), true);
