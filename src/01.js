/*
 * Given a list of expenses, return the product of 2 entries that sum to 2020.
 *
 * Example:
 *
 *   input: [1721, 979, 366, 299, 675, 1456]
 *   the sum of 1721 + 299 is 2020, so return their product: 514579.
 */
exports.part1 = (input) => {
  return input
    .map((n) => 2020 - n)
    .filter((diff) => input.includes(diff))
    .reduce((a, c) => a * c)
}

/*
 * Given a list of expenses, return the product of 3 entries that sum to 2020.
 *
 * Example:
 *
 *   input: [1721, 979, 366, 299, 675, 1456]
 *   the sum of 979, 366 and 675 is 2020, so return their product: 241861950.
 */
exports.part2 = (input) => {
  return input
    .map((n) => 2020 - n)
    .reduce((r, diff) => {
      if (r) return r

      const [v1, v2] = input
        .map((n) => diff - n)
        .filter((x) => input.includes(x))

      return v1 && v2 ? (2020 - diff) * v1 * v2 : r
    }, 0)
}
