const { STATUS, taskStatus } = require('@nubz/gds-task-list-ops')
const schema = {
  eligibility: {
    path: '/task-lists/sequenced/eligibility/',
    summaryPath: './includes/summaries/about-shed.html',
    title: 'Eligibility',
    pages: {
      'do-you-have-a-shed': {
        fields: {
          'has-shed': {
            type: 'enum',
            name: 'yes if you have a shed',
            validValues: ['Yes', 'No']
          }
        }
      },
      'enter-shed-height': {
        includeIf: data => data['has-shed'] === 'Yes',
        fields: {
          'enter-shed-height': {
            type: 'number',
            name: 'the height of your shed in centimeters'
          }
        }
      }
    }
  },
  yourDetails: {
    includeIf: data => taskStatus(data, schema.eligibility) === STATUS.COMPLETE,
    path: '/task-lists/sequenced/yourDetails/',
    summaryPath: './includes/summaries/yourDetails.html',
    title: 'Your details',
    pages: {
      'enter-name': {
        fields: {
          'full-name': {
            type: 'nonEmptyString',
            name: 'your full name',
            maxLength: 135
          }
        }
      },
      'enter-date-of-birth': {
        fields: {
          'date-of-birth': {
            type: 'date',
            name: 'your date of birth',
            max: data => {
              const today = new Date()
              const year = today.getFullYear() - 16
              const month = today.getMonth() + 1
              const day = today.getDate()
              return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
            },
            maxDescription: 'you must be older than 16'
          }
        }
      }
    }
  },
  aboutShed: {
    includeIf: data => taskStatus(data, schema.yourDetails) === STATUS.COMPLETE,
    path: '/task-lists/sequenced/about-shed/',
    summaryPath: './includes/summaries/about-shed.html',
    title: 'About your shed',
    pages: {
      'is-shed-outdoors': {
        fields: {
          'shed-outdoors': {
            type: 'enum',
            name: 'yes if your shed is outdoors',
            validValues: ['Yes', 'No']
          }
        }
      },
      'is-shed-built': {
        fields: {
          'shed-built': {
            type: 'enum',
            name: 'yes if your shed is built',
            validValues: ['Yes', 'No']
          }
        }
      },
      'how-many-windows': {
        fields: {
          'how-many-windows': {
            type: 'number',
            name: 'the amount of windows'
          }
        }
      }
    }
  }
}

module.exports = { schema }
