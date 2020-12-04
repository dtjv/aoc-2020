const test = require('ava')

const { part1, part2 } = require('../src/02')
const data = require('../data/02')

const input = data.input.trim().split('\n')

test('part 1', (t) => {
  t.is(part1(input), 655)
})

test('part 2', (t) => {
  t.is(part2(input), 673)
})
