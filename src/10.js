const format = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((str) => parseInt(str))
    .sort((a, b) => a - b)

  return [0, ...data, data[data.length - 1] + 3]
}

const computeDiffs = (data) => {
  const result = {}

  for (let i = 1; i < data.length; i += 1) {
    const diff = data[i] - data[i - 1]

    if (!result[diff]) {
      result[diff] = 0
    }
    result[diff] += 1
  }

  return result
}

/*
const generateSequences = (data) => {
  let result = []

  for (let i = 1; i < data.length - 2; i += 1) {
    if (data[i - 1] + 3 >= data[i + 1]) {
      result.push(i)
    }
  }

  return result
}
*/

exports.part1 = (input) => {
  const result = computeDiffs(format(input))
  return result[1] * result[3]
}

/*
exports.part2 = (input) => {
  let data = format(input)
  //return Object.keys(generateSequences(data)).length
  return generateSequences(data)
}
*/
