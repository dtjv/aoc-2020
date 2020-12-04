exports.part1 = (input) => {
  const w = input[0].length
  const h = input.length
  const wFactor = Math.ceil((h * 3) / w)
  const grid = input.map((row) => row.repeat(wFactor))
  let treeCount = 0

  for (let row = 0, col = 0; row < h; row += 1, col += 3) {
    if (grid[row][col] === '#') {
      treeCount += 1
    }
  }

  return treeCount
}
