const test = require('ava')

const { part1 } = require('../src/08')
const { dataset1, dataset2 } = require('../data/08')

test('part 1', (t) => {
  t.is(part1(dataset1), 5)
  t.is(part1(dataset2), 1217)
})
