exports.part1 = (input) => {
  const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']

  return input
    .map((passport) =>
      passport.split(' ').reduce((r, o) => {
        const [field, value] = o.split(':')
        return { ...r, [field]: value }
      }, {})
    )
    .filter((passport) => requiredFields.every((field) => passport[field]))
    .length
}
