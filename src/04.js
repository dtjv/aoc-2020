const checkRequiredFields = (passport) => {
  const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']
  return requiredFields.every((field) => !!passport[field])
}

const format = (input) => {
  return input
    .trim()
    .split('\n\n')
    .map((r) => r.replaceAll('\n', ' '))
    .map((passport) =>
      passport.split(' ').reduce((r, o) => {
        const [field, value] = o.split(':')
        return { ...r, [field]: value }
      }, {})
    )
}

const validate = (...validationCallbacks) => {
  return (input) => {
    const data = format(input)
    return data.filter((passport) =>
      validationCallbacks.every((callback) => callback(passport))
    ).length
  }
}

exports.part1 = validate(checkRequiredFields)
//exports.part2 = validate(checkRequiredFields, checkFieldValues)
