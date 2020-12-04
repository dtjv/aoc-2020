const format = (data) => {
  return data
    .trim()
    .split('\n')
    .map((n) => parseInt(n))
}

exports.part1 = (input) => {
  const data = format(input)

  return data
    .map((n) => 2020 - n)
    .filter((diff) => data.includes(diff))
    .reduce((a, c) => a * c)
}

exports.part2 = (input) => {
  const data = format(input)

  return data
    .map((n) => 2020 - n)
    .reduce((r, diff) => {
      if (r) return r

      const [v1, v2] = data.map((n) => diff - n).filter((x) => data.includes(x))

      return v1 && v2 ? (2020 - diff) * v1 * v2 : r
    }, 0)
}
