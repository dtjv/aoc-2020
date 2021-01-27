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

const rotateShip = (ship, cmd) => {
  const directions = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST,
  ]
  const numDirections = directions.length
  const rotateFactor = cmd.quantity / 90

  let idx = directions.indexOf(ship.d)

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
  ship.d = directions[idx]
}

const updateShipPosition = (ship, cmd) => {
  const action = cmd.action === Action.FORWARD ? Action[ship.d] : cmd.action

  switch (action) {
    case Action.NORTH:
      ship.y += cmd.quantity
      break
    case Action.SOUTH:
      ship.y -= cmd.quantity
      break
    case Action.EAST:
      ship.x += cmd.quantity
      break
    case Action.WEST:
      ship.x -= cmd.quantity
      break
    case Action.RIGHT:
    case Action.LEFT:
      rotateShip(ship, cmd)
      break
    default:
      throw new Error(`updateShipPosition: invalid action '${action}'`)
  }
}

const rotate90 = (point, action) => {
  let [x, y] = [point.y, point.x]

  if (action === Action.RIGHT) {
    y = y * -1
  }
  if (action === Action.LEFT) {
    x = x * -1
  }

  return [x, y]
}

const rotateWayPoint = (wayPoint, cmd) => {
  const rotateFactor = cmd.quantity / 90

  for (let i = 0; i < rotateFactor; i += 1) {
    ;[wayPoint.offsetX, wayPoint.offsetY] = rotate90(
      { x: wayPoint.offsetX, y: wayPoint.offsetY },
      cmd.action
    )
  }
}

const processCommand = (cmd, ship, wayPoint) => {
  switch (cmd.action) {
    case Action.NORTH:
      wayPoint.offsetY += cmd.quantity
      break
    case Action.SOUTH:
      wayPoint.offsetY -= cmd.quantity
      break
    case Action.EAST:
      wayPoint.offsetX += cmd.quantity
      break
    case Action.WEST:
      wayPoint.offsetX -= cmd.quantity
      break
    case Action.FORWARD:
      ship.x += wayPoint.offsetX * cmd.quantity
      ship.y += wayPoint.offsetY * cmd.quantity
      break
    case Action.RIGHT:
    case Action.LEFT:
      rotateWayPoint(wayPoint, cmd)
      break
    default:
      throw new Error(`processCommand: invalid action '${cmd.action}'`)
  }
}

exports.part1 = (input) => {
  const commands = format(input)
  const ship = { x: 0, y: 0, d: Direction.EAST }

  for (command of commands) {
    updateShipPosition(ship, command)
  }

  return Math.abs(ship.x) + Math.abs(ship.y)
}

exports.part2 = (input) => {
  const commands = format(input)
  const ship = { x: 0, y: 0, d: Direction.EAST }
  const wayPoint = { offsetX: 10, offsetY: 1 }

  for (command of commands) {
    processCommand(command, ship, wayPoint)
  }

  return Math.abs(ship.x) + Math.abs(ship.y)
}
