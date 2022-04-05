module.exports = {
  idRef: {
    fields: {
      reference: {
        type: 'nonEmptyString',
        name: 'your reference number',
        matches: ['123456', 'ABCDEF'],
        exactLength: 6,
        errors: {
          noMatch: 'Your reference does not match our records'
        }
      }
    }
  },
  idRefExclusions: {
    fields: {
      reference: {
        type: 'nonEmptyString',
        name: 'your reference number',
        matchingExclusions: ['123456', 'ABCDEF'],
        exactLength: 6,
        errors: {
          noMatch: 'Your reference does not match our records'
        }
      }
    }
  }
}
