const test = require('ava')

const { part1, part2 } = require('../src/01')
const { input } = require('../data/01')

test('part 1', (t) => {
  t.is(part1(input), 482811)
})

test('part 2', (t) => {
  t.is(part2(input), 193171814)
})
