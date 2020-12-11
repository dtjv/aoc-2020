const format = (input) => {
  return input.trim().split('\n')
}

const parseInput = (instruction) => {
  const [op, arg] = instruction.split(' ')
  return {
    op,
    arg: parseInt(arg),
  }
}

const addVisitsFlag = (instruction) => ({ ...instruction, visits: 0 })

const runBootCode = (input) => {
  const instructions = input.map(addVisitsFlag)
  let accumulator = 0
  let ptr = 0
  let isComplete = false

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

  if (ptr === instructions.length) {
    isComplete = true
  }

  return { accumulator, isComplete }
}

exports.part1 = (input) => {
  return runBootCode(format(input).map(parseInput)).accumulator
}

exports.part2 = (input) => {
  const instructions = format(input).map(parseInput)
  let testSet = undefined
  let results = { accumulator: 0, isComplete: false }

  for (let i = 0; i < instructions.length && !results.isComplete; i += 1) {
    switch (instructions[i].op) {
      case 'nop':
        testSet = instructions.map((instruction, idx) =>
          idx === i ? { op: 'jmp', arg: instruction.arg } : instruction
        )
        break
      case 'jmp':
        testSet = instructions.map((instruction, idx) =>
          idx === i ? { op: 'nop', arg: instruction.arg } : instruction
        )
        break
      case 'acc':
        testSet = undefined
        break
      default:
        throw new Error(`invalid instruction: ${instructions[i].op}`)
    }

    if (testSet) {
      results = runBootCode(testSet)
    }
  }

  return results.accumulator
}
