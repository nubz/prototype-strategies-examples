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
  companyNameMaxLength: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name',
        maxLength: 10
      }
    }
  },
  companyNameMinLength: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name',
        minLength: 4
      }
    }
  },
  companyNameBetweenMinMax: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name',
        minLength: 4,
        maxLength: 10
      }
    }
  },
  companyNameExactLength: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name',
        exactLength: 3
      }
    }
  },
  companyNameRegex: {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name',
        regex: /^[0-9A-Za-z\s-']+$/,
        errors: {
          pattern: 'Company name must only include letters, numbers, spaces, apostrophes or hyphens'
        }
      }
    }
  },
  bankDetails: {
    fields: {
      'account-name': {
        type: 'nonEmptyString',
        name: 'the name on your account',
        maxLength: 35
      },
      'sort-code': {
        type: 'nonEmptyString',
        name: 'your sort code',
        exactLength: 6,
        inputType: 'digits',
        transform: data => data['sort-code'].replace(/-/g, '').replace(/\s+/g, '')
      },
      'account-number': {
        type: 'number',
        name: 'your account number',
        exactLength: 8,
        inputType: 'digits'
      }
    }
  }
}
