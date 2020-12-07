const test = require('ava')

const { part1, part2 } = require('../src/06')
const { dataset1, dataset2 } = require('../data/06')

test('part 1', (t) => {
  t.is(part1(dataset1), 11)
  t.is(part1(dataset2), 6612)
})

test('part 2', (t) => {
  t.is(part2(dataset1), 6)
  t.is(part2(dataset2), 3268)
})
