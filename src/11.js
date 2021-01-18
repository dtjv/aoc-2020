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

const getCountForChar = (grid, char) => {
  let count = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell === char) count++
    }
  }

  return count
}

// returns an array of visible cell values from cell at ['row','col']. a visible
// cell is the first non-floor cell in any direction. adjacent cells are only
// those that touch cell at ['row','col'].
const getVisibleCells = (grid, row, col, options) => {
  const adjacentOnly = !!options?.adjacentOnly
  const steps = [-1, 0, 1]
  const rows = grid.length
  const cols = grid[0].length
  const visibleCells = []

  for (let i = 0; i < steps.length; i++) {
    for (let j = 0; j < steps.length; j++) {
      let r = row + steps[i]
      let c = col + steps[j]

      while (r >= 0 && c >= 0 && r < rows && c < cols) {
        if (r === row && c === col) break

        // we only care about the FIRST cell that's not the floor.
        if (grid[r][c] !== Cell.FLOOR) {
          visibleCells.push(grid[r][c])
          break
        }

        if (adjacentOnly) break

        r = r + steps[i]
        c = c + steps[j]
      }
    }
  }

  return visibleCells
}

const processCell = (grid, g, row, col, options) => {
  const visibleCells = getVisibleCells(grid, row, col, options)
  let changed = false

  // if cell is empty and all adjacent cells are empty, then occupy cell
  if (
    grid[row][col] === Cell.EMPTY &&
    visibleCells.every((cell) => cell !== Cell.OCCUPIED)
  ) {
    g[row][col] = Cell.OCCUPIED
    changed = true
  }

  // if cell and N+ adjacent cells are occupied, empty the cell
  if (
    grid[row][col] === Cell.OCCUPIED &&
    visibleCells.reduce(
      (count, cell) => (cell === Cell.OCCUPIED ? count + 1 : count),
      0
    ) >= options.occupiedThreshold
  ) {
    g[row][col] = Cell.EMPTY
    changed = true
  }

  return changed
}

// modifies grid and returns true if grid changed, false otherwise.
const processGrid = (grid, options) => {
  const g = JSON.parse(JSON.stringify(grid))

  let changed = false

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (processCell(grid, g, i, j, options)) {
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

//------------------------------------------------------------------------------
// part 1
//------------------------------------------------------------------------------
exports.part1 = (input) => {
  const grid = format(input)
  let changed = true

  while (changed) {
    changed = processGrid(grid, { adjacentOnly: true, occupiedThreshold: 4 })
  }

  return getCountForChar(grid, Cell.OCCUPIED)
}

//------------------------------------------------------------------------------
// part 2
//------------------------------------------------------------------------------
exports.part2 = (input) => {
  const grid = format(input)
  let changed = true

  while (changed) {
    changed = processGrid(grid, { adjacentOnly: false, occupiedThreshold: 5 })
  }

  return getCountForChar(grid, Cell.OCCUPIED)
}
