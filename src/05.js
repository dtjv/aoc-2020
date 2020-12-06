const search = (list = [], instructions = []) => {
  const keys = instructions.slice(0)
  const mid = Math.floor(list.length / 2)

  if (!keys.length) return list[mid]

  const key = keys.shift()

  return key === 'F' || key === 'L'
    ? search(list.slice(0, mid), keys)
    : search(list.slice(mid), keys)
}

const format = (input) => {
  return input
    .trim()
    .split('\n')
    .map((entry) => ({
      rows: entry.substring(0, entry.length - 3).split(''),
      cols: entry.substring(entry.length - 3).split(''),
    }))
}

const ROWS = new Array(128).fill(0).map((_, i) => i)
const COLS = new Array(8).fill(0).map((_, i) => i)

const calculateSeatIds = (input) => {
  return input.map((instructions) => {
    const row = search(ROWS, instructions.rows)
    const col = search(COLS, instructions.cols)
    return row * 8 + col
  })
}

exports.part1 = (input) => {
  return calculateSeatIds(format(input))
    .sort((a, b) => a - b)
    .pop()
}

exports.part2 = (input) => {
  const seatIds = calculateSeatIds(format(input)).sort((a, b) => a - b)
  const s = seatIds[0]
  const e = seatIds[seatIds.length - 1]

  for (let i = s; i <= e; i++) {
    if (!seatIds.includes(i)) return i
  }
}
