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

exports.part1 = (input) => {
  return format(input)
    .map((instructions) => {
      const row = search(ROWS, instructions.rows)
      const col = search(COLS, instructions.cols)
      return row * 8 + col
    })
    .sort((a, b) => a - b)
    .pop()
}
