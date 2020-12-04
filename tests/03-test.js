const test = require('ava')

const { part1, part2 } = require('../src/03')
const { input } = require('../data/03')

test('part 1', (t) => {
  t.is(part1(input), 181)
})

test('part 2', (t) => {
  t.is(part2(input), 1260601650)
})
