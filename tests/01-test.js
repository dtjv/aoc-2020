const test = require('ava')

const { part1, part2 } = require('../src/01')
const data = require('../data/01')

const input = data.input
  .trim()
  .split('\n')
  .map((n) => parseInt(n))

test('part 1', (t) => {
  t.is(part1(input), 482811)
})

test('part 2', (t) => {
  t.is(part2(input), 193171814)
})
