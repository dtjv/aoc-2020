const test = require('ava')

const { part1 } = require('../src/10')
const { dataset1, dataset2, dataset3 } = require('../data/10')

test('part 1', (t) => {
  t.is(part1(dataset1), 35)
  t.is(part1(dataset2), 220)
  t.is(part1(dataset3), 1980)
})
