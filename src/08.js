const format = (input) => {
  return input.trim().split('\n')
}

const parseInput = (instruction) => {
  const [op, arg] = instruction.split(' ')
  return {
    op,
    arg: parseInt(arg),
    visits: 0,
  }
}

exports.part1 = (input) => {
  const instructions = format(input).map(parseInput)
  let accumulator = 0
  let ptr = 0

  while (ptr >= 0 && ptr < instructions.length) {
    const instruction = instructions[ptr]

    if (instruction.visits === 1) {
      break
    }

    instruction.visits += 1

    switch (instruction.op) {
      case 'acc':
        accumulator += instruction.arg
        ptr += 1
        break
      case 'jmp':
        ptr += instruction.arg
        break
      case 'nop':
        ptr += 1
        break
      default:
        throw new Error(`invalid instruction: ${instruction.op}`)
    }
  }

  return accumulator
}
