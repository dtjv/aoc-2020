const test = require('ava')

const { part1, part2 } = require('../src/04')
const { input, valid, invalid } = require('../data/04')

test('part 1', (t) => {
  t.is(part1(input), 242)
})

test('part 2', (t) => {
  t.is(part2(valid), 4)
  t.is(part2(invalid), 0)
  t.is(part2(input), 186)
})
