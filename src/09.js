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

const sum = (numbers) => numbers.reduce((total, num) => total + num, 0)

const locateSet = (data, target) => {
  let d
  let s = 0
  let e = 2

  while (e < data.length) {
    d = data.slice(s, e)
    let total = sum(d)

    if (total < target) {
      e += 1
    } else if (total > target) {
      s += 1
      if (e - s < 2) {
        e += 1
      }
    } else {
      return d
    }
  }

  return []
}

exports.part2 = (input, target) => {
  const set = locateSet(format(input.data), target)
  const sorted = set.sort((a, b) => a - b)
  return sorted[0] + sorted[sorted.length - 1]
}
