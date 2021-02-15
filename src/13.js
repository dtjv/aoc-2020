const { dataSetA } = require('../data/13')

const format = (data) => {
  return data.trim().split('\n')
}

const getNextBusId = (targetTimestamp, activeBusIds) => {
  return activeBusIds
    .map((busId) => {
      const nextStop = Math.floor(targetTimestamp / busId) * busId + busId
      const minutesToWait = nextStop - targetTimestamp
      return { busId, minutesToWait }
    })
    .sort((a, b) => a.minutesToWait - b.minutesToWait)
    .shift()
}

exports.part1 = (input) => {
  const [ts, busIds] = format(input)
  const earliestDepartureTimestamp = parseInt(ts)
  const activeBusIds = busIds
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => parseInt(id))

  const nextBus = getNextBusId(earliestDepartureTimestamp, activeBusIds)

  return nextBus.busId * nextBus.minutesToWait
}
