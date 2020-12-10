const format = (input) => {
  return input.trim().split('\n')
}

const stripPattern = (pattern) => (str) => str.replace(pattern, '').trim()
const stripBags = stripPattern(/bags?\.?$/g)
const stripNum = stripPattern(/^\d\s/)

const parseRule = (rule) => {
  const [parent, children] = rule.split(' contain ')
  return {
    parent: stripBags(parent),
    children: children.split(', ').map(stripBags).map(stripNum),
  }
}

const makeTree = (tree, entry) => {
  entry.children
    .filter((child) => child !== 'no other')
    .forEach((child) => {
      if (!tree[child]) {
        tree[child] = []
      }
      tree[child].push(entry.parent)
    })
  return tree
}

const makeSet = (list) => {
  const s = new Set()

  list.forEach((item) => s.add(JSON.stringify(item)))

  return s
}

const computeForColor = (target) => (input) => {
  const tree = format(input).map(parseRule).reduce(makeTree, {})

  function f(data, target, level = 0) {
    let result = [target]
    let parents = data[target] || []

    for (const parent of parents) {
      result = [...result, ...f(data, parent, level + 1)]
    }

    return result
  }

  return makeSet(f(tree, target)).size - 1
}

exports.part1 = computeForColor('shiny gold')
