const Cell = {
  OCCUPIED: '#',
  EMPTY: 'L',
  FLOOR: '.',
}

const format = (data) => {
  return data
    .trim()
    .split('\n')
    .map((row) => row.split(''))
}

const processCell = (grid, g, row, col) => {
  let changed = false

  const rows = grid.length
  const cols = grid[0].length

  const adjacentCells = [
    { r: row - 1, c: col },
    { r: row - 1, c: col + 1 },
    { r: row, c: col + 1 },
    { r: row + 1, c: col + 1 },
    { r: row + 1, c: col },
    { r: row + 1, c: col - 1 },
    { r: row, c: col - 1 },
    { r: row - 1, c: col - 1 },
  ]
    .filter(({ r, c }) => r >= 0 && r < rows && c >= 0 && c < cols)
    .map(({ r, c }) => grid[r][c])

  if (
    grid[row][col] === Cell.EMPTY &&
    adjacentCells.every((cell) => cell !== Cell.OCCUPIED)
  ) {
    g[row][col] = Cell.OCCUPIED
    changed = true
  }

  if (
    grid[row][col] === Cell.OCCUPIED &&
    adjacentCells.reduce(
      (count, cell) => (cell === Cell.OCCUPIED ? count + 1 : count),
      0
    ) >= 4
  ) {
    g[row][col] = Cell.EMPTY
    changed = true
  }

  return changed
}

const processGrid = (grid) => {
  const g = JSON.parse(JSON.stringify(grid))
  let changed = false

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (processCell(grid, g, i, j)) {
        changed = true
      }
    }
  }

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      grid[i][j] = g[i][j]
    }
  }

  return changed
}

exports.part1 = (input) => {
  const grid = format(input)
  let changed = processGrid(grid)

  while (changed) {
    changed = processGrid(grid)
  }

  let count = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell === Cell.OCCUPIED) count++
    }
  }

  return count
}
