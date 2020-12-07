const format = (input) => {
  return input.trim().split('\n\n')
}

exports.part1 = (input) => {
  return format(input)
    .map((group) => {
      return group
        .replaceAll('\n', '')
        .split('')
        .reduce((hash, char) => ({ ...hash, [char]: true }), {})
    })
    .reduce((total, group) => total + Object.keys(group).length, 0)
}

exports.part2 = (input) => {
  const data = format(input).map((group) => group.split('\n'))
  const numPeoplePerGroup = data.map((group) => group.length)

  return data
    .map((group) =>
      group
        .map((g) => g.split(''))
        .reduce((hash, p) => {
          p.forEach((answer) => {
            if (!hash[answer]) {
              hash[answer] = 0
            }
            hash[answer] += 1
          })
          return hash
        }, {})
    )
    .reduce(
      (count, group, idx) =>
        count +
        Object.values(group).reduce(
          (r, v) => (v === numPeoplePerGroup[idx] ? r + 1 : r),
          0
        ),
      0
    )
}
