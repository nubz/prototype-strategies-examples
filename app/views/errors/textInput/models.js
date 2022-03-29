// these models are all for the same field and would not normally use
// the validation rules in their name - this is demo protocol only!

module.exports = {
  companyNameRequired: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name'
      }
    }
  },
  companyNameOptionalMaxLength: {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        maxLength: 10
      }
    }
  },
  companyNameOptionalMinLength: {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        minLength: 4
      }
    }
  },
  companyNameOptionalExactLength: {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        exactLength: 3
      }
    }
  },
  companyNameOptionalRegex: {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        regex: /^[0-9A-Za-z\s-']+$/,
        patternText: 'Your company name must only include letters, numbers, spaces, apostrophes or hyphens'
      }
    }
  }
}
