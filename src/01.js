exports.part1 = (input) => {
  return input
    .map((n) => 2020 - n)
    .filter((diff) => input.includes(diff))
    .reduce((a, c) => a * c)
}

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
