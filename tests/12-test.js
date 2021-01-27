const test = require('ava')

const { part1, part2 } = require('../src/12')
const { dataSetA, dataSetB } = require('../data/12')

test('part 1', (t) => {
  t.is(part1(dataSetA), 25)
  t.is(part1(dataSetB), 590)
})

test('part 2', (t) => {
  t.is(part2(dataSetA), 286)
  t.is(part2(dataSetB), 42013)
})
