const test = require('ava')

const { part1, part2 } = require('../src/07')
const { dataset1, dataset2, dataset3 } = require('../data/07')

test('part 1', (t) => {
  t.is(part1(dataset1), 4)
  t.is(part1(dataset2), 378)
})

test('part 2', (t) => {
  t.is(part2(dataset1), 32)
  t.is(part2(dataset2), 27526)
  t.is(part2(dataset3), 126)
})
