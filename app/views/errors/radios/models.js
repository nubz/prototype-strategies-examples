module.exports = {
  ownAShed: {
    fields: {
      'own-a-shed': {
        type: 'enum',
        name: 'yes if you own a shed',
        validValues: ['Yes', 'No']
      }
    }
  },
  contactPreferences: {
    fields: {
      'contact-preference': {
        type: 'enum',
        name: 'how you would like to be contacted',
        validValues: ['Email', 'Telephone']
      },
      email: {
        includeIf: data => data['contact-preference'] === 'Email',
        type: 'nonEmptyString',
        name: 'your email address'
      },
      telephone: {
        includeIf: data => data['contact-preference'] === 'Telephone',
        type: 'nonEmptyString',
        name: 'your telephone number'
      }
    }
  }
}
