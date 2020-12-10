const format = (input) => {
  return input.trim().split('\n')
}

const stripPattern = (pattern) => (str) => str.replace(pattern, '').trim()
const stripBags = stripPattern(/bags?\.?$/g)
const filterNoOther = (str) => str !== 'no other'

const parseNum = (str) => {
  const [count, ...rest] = str.split(' ')
  return {
    count: count === '' ? 0 : parseInt(count),
    name: rest.join(' '),
  }
}

const parseRule = (rule) => {
  const [parent, children] = rule.split(' contain ')
  return {
    parent: stripBags(parent),
    children: children
      .split(', ')
      .map(stripBags)
      .filter(filterNoOther)
      .map(parseNum),
  }
}

const makeChildToParentHash = (hash, entry) => {
  entry.children
    .filter((child) => child.name !== 'no other')
    .forEach((child) => {
      if (!hash[child.name]) {
        hash[child.name] = []
      }
      hash[child.name].push(entry.parent)
    })
  return hash
}

const makeParentToChildHash = (hash, entry) =>
  !hash[entry.parent] ? { ...hash, [entry.parent]: entry.children } : hash

const makeSet = (list) => {
  const s = new Set()

  list.forEach((item) => s.add(JSON.stringify(item)))

  return s
}

const findNumBagsToHold = (target) => (input) => {
  const hash = format(input).map(parseRule).reduce(makeChildToParentHash, {})

  function f(data, target, level = 0) {
    let result = [target]
    let parents = data[target] || []

    for (const parent of parents) {
      result = [...result, ...f(data, parent, level + 1)]
    }

    return result
  }

  return makeSet(f(hash, target)).size - 1
}

const findNumBagsIn = (target) => (input) => {
  const hash = format(input).map(parseRule).reduce(makeParentToChildHash, {})

  function f(data, target) {
    let result = 0
    let children = data[target] || []

    for (const child of children) {
      result = result + child.count * f(data, child.name)
    }

    return result + children.reduce((sum, child) => sum + child.count, 0)
  }

  return f(hash, target)
}

exports.part1 = findNumBagsToHold('shiny gold')
exports.part2 = findNumBagsIn('shiny gold')
