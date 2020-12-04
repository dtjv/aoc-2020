const checkRequiredFields = (passport) => {
  const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']
  return requiredFields.every((field) => !!passport[field])
}

const parseHeight = (height) => {
  const unit = height.substring(height.length - 2)
  const value = parseInt(height.replace(unit, ''))
  return { height: value, unit }
}

const isValidYearFormat = (year) => {
  return /^\d{4}$/g.test(year)
}

const isValueInRange = (value, min, max) => {
  return value >= min && value <= max
}

const isValidHeightFormat = (height) => {
  return /^\d+(in|cm)$/g.test(height)
}

const isValidHairColorFormat = (color) => {
  return /^#[0-9|a-f]{6}$/.test(color)
}

const isValidEyeColorValue = (color) => {
  const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  return colors.includes(color)
}

const isValidPassportIdFormat = (passportId) => {
  return /^\d{9}$/g.test(passportId)
}

/*
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
    - If cm, the number must be at least 150 and at most 193.
    - If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid (Country ID) - ignored, missing or not.
*/
const checkFieldValues = (passport) => {
  if (
    !isValidYearFormat(passport['byr']) ||
    !isValueInRange(passport['byr'], 1920, 2002)
  )
    return false

  if (
    !isValidYearFormat(passport['iyr']) ||
    !isValueInRange(passport['iyr'], 2010, 2020)
  )
    return false

  if (
    !isValidYearFormat(passport['eyr']) ||
    !isValueInRange(passport['eyr'], 2020, 2030)
  ) {
    return false
  }

  if (!isValidHeightFormat(passport['hgt'])) return false

  const h = parseHeight(passport['hgt'])

  if (
    (h.unit === 'cm' && !isValueInRange(h.height, 150, 193)) ||
    (h.unit === 'in' && !isValueInRange(h.height, 59, 76))
  ) {
    return false
  }

  if (!isValidHairColorFormat(passport['hcl'])) return false

  if (!isValidEyeColorValue(passport['ecl'])) return false

  if (!isValidPassportIdFormat(passport['pid'])) return false

  return true
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
exports.part2 = validate(checkRequiredFields, checkFieldValues)
