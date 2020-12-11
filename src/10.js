const format = (input) => {
  return input
    .trim()
    .split('\n')
    .map((str) => parseInt(str))
    .sort((a, b) => a - b)
}

exports.part1 = (input) => {
  let data = format(input)
  data = [0, ...data, data[data.length - 1] + 3]

  const result = {}

  for (let i = 1; i < data.length; i += 1) {
    const diff = data[i] - data[i - 1]

    if (!result[diff]) {
      result[diff] = 0
    }
    result[diff] += 1
  }

  return result[1] * result[3]
}
