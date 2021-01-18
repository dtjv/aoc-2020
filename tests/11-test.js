const test = require('ava')

const { part1, part2 } = require('../src/11')
const { dataSetA, dataSetB } = require('../data/11')

test('part 1', (t) => {
  t.is(part1(dataSetA), 37)
  t.is(part1(dataSetB), 2113)
})

test('part 2', (t) => {
  t.is(part2(dataSetA), 26)
  t.is(part2(dataSetB), 1865)
})
