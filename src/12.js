const Direction = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
}

const Action = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'W',
  RIGHT: 'R',
  LEFT: 'L',
  FORWARD: 'F',
}

const format = (data) => {
  return data.trim().split('\n').map(parseInstruction)
}

const parseInstruction = (instruction) => {
  const action = instruction[0]
  const quantity = parseInt(instruction.slice(1), 10)
  return { action, quantity }
}

const rotatePosition = (pos, cmd) => {
  const directions = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST,
  ]
  const numDirections = directions.length
  const rotateFactor = cmd.quantity / 90

  let idx = directions.indexOf(pos.d)

  if (cmd.action === Action.RIGHT) {
    idx += rotateFactor
    if (idx > numDirections - 1) {
      idx = idx - numDirections
    }
  } else {
    idx -= rotateFactor
    if (idx < 0) {
      idx += numDirections
    }
  }
  pos.d = directions[idx]
}

const updatePosition = (pos, cmd) => {
  const action = cmd.action === Action.FORWARD ? Action[pos.d] : cmd.action

  switch (action) {
    case Action.NORTH:
      pos.y += cmd.quantity
      break
    case Action.SOUTH:
      pos.y -= cmd.quantity
      break
    case Action.EAST:
      pos.x += cmd.quantity
      break
    case Action.WEST:
      pos.x -= cmd.quantity
      break
    case Action.RIGHT:
      rotatePosition(pos, cmd)
      break
    case Action.LEFT:
      rotatePosition(pos, cmd)
      break
    default:
      throw new Error(`invalid action '${action}'`)
  }
}

exports.part1 = (input) => {
  const commands = format(input)
  const pos = { x: 0, y: 0, d: Direction.EAST }

  for (command of commands) {
    updatePosition(pos, command)
  }

  return Math.abs(pos.x) + Math.abs(pos.y)
}
