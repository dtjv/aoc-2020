const test = require('ava')

const { part1, part2 } = require('../src/01')
const fixture = require('./fixtures/01')

const data = fixture.data
  .trim()
  .split('\n')
  .map((n) => parseInt(n))

test('part 1', (t) => {
  t.is(part1(data), 482811)
})

test('part 2', (t) => {
  t.is(part2(data), 193171814)
})
