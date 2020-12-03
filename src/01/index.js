const { data } = require('./data')

const expenses = data
  .trim()
  .split('\n')
  .map((n) => parseInt(n))

/*
 * Given a list of expenses, find the two entries that sum to 2020 and return
 * the product of those two entries.
 *
 * Example:
 *
 *   input: [1721, 979, 366, 299, 675, 1456]
 *   since 1721 + 299 is 2020, return the produce, 514579.
 */

const aoc01 = (input) => {
  return input
    .map((n) => 2020 - n)
    .filter((diff) => input.includes(diff))
    .reduce((a, c) => a * c)
}

console.log(aoc01(expenses))
