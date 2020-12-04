const test = require('ava')

const { part1 } = require('../src/04')
const data = require('../data/04')

const input = data.input
  .trim()
  .split('\n\n')
  .map((record) => record.replaceAll('\n', ' '))

test('part 1', (t) => {
  t.is(part1(input), 242)
})

/*
test('part 2', (t) => {
  t.is(part2(input), 1260601650)
})
*/
