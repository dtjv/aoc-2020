/*
 * Given a list of password policies, return the number of valid passwords.
 *
 * A policy follows the form:
 *
 *   minimum occurance-maximum occurance char: password
 *
 * A password is valid when 'char' exists in 'password' at least a 'minimum
 * occurance' and a most a 'maximum occurance'.
 *
 * Example:
 *
 *   input: [
 *     '1-3 a: abcde',
 *     '1-3 b: cdefg',
 *     '2-9 c: ccccccccc',
 *   ]
 *
 * The result is 2, since 'a' occurs 1 time in 'abcde' which is in the 1-3
 * range, and 'c' occurs in 'ccccccccc' in the 2-9 range.
 */
exports.part1 = (input) => {
  return input
    .map((entry) =>
      entry.split(' ').reduce((r, c, i) => {
        switch (i) {
          case 0:
            return { ...r, range: c.split('-').map((s) => parseInt(s)) }
          case 1:
            return { ...r, char: c.replace(':', '') }
          default:
            return { ...r, password: c }
        }
      }, {})
    )
    .filter((policy) => {
      const re = new RegExp(policy.char, 'g')
      const matches = policy.password.match(re)

      return (
        matches &&
        matches.length >= policy.range[0] &&
        matches.length <= policy.range[1]
      )
    }).length
}

/*
 * Given a list of password policies, return the number of valid passwords.
 *
 * A policy follows the form:
 *
 *   positionA-positionB char: password
 *
 * A password is valid when 'char' exists in 'password' at either 'positionA' or
 * 'positionB', but not both.
 *
 * Note, positions are 1 indexed into password. No concept of 0-based index.
 *
 * Example:
 *
 *   input: [
 *     '1-3 a: abcde',     // valid. 'a' exists at position 1, not position 3
 *     '1-3 b: cdefg',     // invalid. 'b' does not exist
 *     '2-9 c: ccccccccc', // invalid. 'c' exists at both position 2 and 9
 *   ]
 */
exports.part2 = (input) => {
  return input
    .map((entry) =>
      entry.split(' ').reduce((r, c, i) => {
        switch (i) {
          case 0:
            return { ...r, positions: c.split('-').map((s) => parseInt(s)) }
          case 1:
            return { ...r, char: c.replace(':', '') }
          default:
            return { ...r, password: c }
        }
      }, {})
    )
    .filter(({ positions, char, password }) => {
      const re = new RegExp(char, 'g')
      const matches = [...password.matchAll(re)].map((r) => r.index)
      const numMatches = positions
        .map((pos) => pos - 1)
        .filter((pos) => matches.includes(pos)).length

      return numMatches === 1
    }).length
}
