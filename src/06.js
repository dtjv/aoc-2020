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
