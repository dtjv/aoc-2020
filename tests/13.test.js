const test = require('ava')

const { part1 } = require('../src/13')
const { dataSetA } = require('../data/13')

test('part 1', (t) => {
  t.is(part1(dataSetA), 295)
  //t.is(part1(dataSetB), 590)
})
