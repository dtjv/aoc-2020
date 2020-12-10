const test = require('ava')

const { part1 } = require('../src/07')
const { dataset1, dataset2 } = require('../data/07')

test('part 1', (t) => {
  t.is(part1(dataset1), 4)
  t.is(part1(dataset2), 378)
})
