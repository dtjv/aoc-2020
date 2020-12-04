const format = (data) => {
  return data.trim().split('\n')
}

exports.part1 = (input) => {
  const data = format(input)

  return data
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

exports.part2 = (input) => {
  const data = format(input)

  return data
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
