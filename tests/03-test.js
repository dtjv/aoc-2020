const test = require('ava')

const { part1 } = require('../src/03')
const data = require('../data/03')

const input = data.input.trim().split('\n')

test('part 1', (t) => {
  t.is(part1(input), 181)
})
