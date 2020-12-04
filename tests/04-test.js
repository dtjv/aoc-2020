const test = require('ava')

const { part1 } = require('../src/04')
const { input } = require('../data/04')

test('part 1', (t) => {
  t.is(part1(input), 242)
})

/*
test('part 2', (t) => {
  t.is(part2(input), 1260601650)
})
*/
