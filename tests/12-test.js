const test = require('ava')

const { part1 } = require('../src/12')
const { dataSetA, dataSetB } = require('../data/12')

test('part 1', (t) => {
  t.is(part1(dataSetA), 25)
  t.is(part1(dataSetB), 590)
})
