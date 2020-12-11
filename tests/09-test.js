const test = require('ava')

const { part1, part2 } = require('../src/09')
const { dataset1, dataset2 } = require('../data/09')

test('part 1', (t) => {
  t.is(part1(dataset1), 127)
  t.is(part1(dataset2), 14144619)
})

test('part 2', (t) => {
  t.is(part2(dataset1, 127), 62)
  t.is(part2(dataset2, 14144619), 1766397)
})
