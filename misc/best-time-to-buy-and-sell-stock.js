import assert from "assert";

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let res = 0;

  let i = 0;
  let j = 1;
  while (j < prices.length) {
    if (prices[j] < prices[i]) {
      i = j;
    } else {
      res = Math.max(res, prices[j] - prices[i]);
    }
    j++;
  }

  return res;
};

// assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5);
assert.equal(maxProfit([2, 1, 2, 1, 0, 1, 2]), 2);
