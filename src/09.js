const format = (input) => {
  return input
    .trim()
    .split('\n')
    .map((str) => parseInt(str))
}

const isValidNum = (target, numbers) =>
  !!numbers.map((num) => target - num).find((diff) => numbers.includes(diff))

exports.part1 = (input) => {
  const data = format(input.data)

  let s = 0
  let t = input.preambleSize

  while (
    t < data.length &&
    isValidNum(data[t], data.slice(s, s + input.preambleSize))
  ) {
    s += 1
    t += 1
  }

  return t < data.length ? data[t] : -1
}
