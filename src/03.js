const format = (data) => {
  return data.trim().split('\n')
}

exports.part1 = (input, slope = { x: 3, y: 1 }) => {
  const data = format(input)

  const w = data[0].length
  const h = data.length
  const wFactor = Math.ceil((h * slope.x) / slope.y / w)
  const grid = data.map((row) => row.repeat(wFactor))
  let treeCount = 0

  for (let row = 0, col = 0; row < h; row += slope.y, col += slope.x) {
    if (grid[row][col] === '#') {
      treeCount += 1
    }
  }

  return treeCount
}

exports.part2 = (input) => {
  return [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
    .map((slope) => exports.part1(input, slope))
    .reduce((r, count) => r * count)
}
