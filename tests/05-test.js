const test = require('ava')

const { part1 } = require('../src/05')
const { dataset1, dataset2 } = require('../data/05')

test('part 1', (t) => {
  t.is(part1(dataset1), 820)
  t.is(part1(dataset2), 883)
})
