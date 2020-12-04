const test = require('ava')

const { part1, part2 } = require('../src/02')
const fixture = require('./fixtures/02')

const dataA = fixture.dataA.trim().split('\n')
const dataB = fixture.dataB.trim().split('\n')

test('part 1', (t) => {
  t.is(part1(dataA), 2)
  t.is(part1(dataB), 655)
})

test('part 2', (t) => {
  t.is(part2(dataA), 1)
  t.is(part2(dataB), 673)
})
