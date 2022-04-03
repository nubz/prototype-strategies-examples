// these models are all for the same field and would not normally use
// the validation rules in their name - this is demo protocol only!

module.exports = {
  dateBought: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed'
      }
    }
  },
  dateBeforeToday: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        beforeToday: true
      }
    }
  },
  dateBeforeFixedDate: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        min: '2022-01-01',
        minDescription: 'the day the shed went on sale'
      }
    }
  },
  beforeFunctionDate: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        min: data => {
          const today = new Date()
          const year = today.getFullYear() - 100
          const month = today.getMonth() + 1
          const day = today.getDate()
          return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
        },
        minDescription: 'one hundred years ago'
      }
    }
  },
  afterFixedDate: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        max: '2022-02-01',
        maxDescription: 'the last day the shed was on sale'
      }
    }
  },
  afterFunctionDate: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        max: data => {
          const today = new Date()
          const year = today.getFullYear() - 1
          const month = today.getMonth() + 1
          const day = today.getDate()
          return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
        },
        maxDescription: 'one year ago'
      }
    }
  },
  betweenMinAndMaxFunctions: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        min: data => {
          const today = new Date()
          const year = today.getFullYear() - 100
          const month = today.getMonth() + 1
          const day = today.getDate()
          return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
        },
        minDescription: 'one hundred years ago',
        max: data => {
          const today = new Date()
          const year = today.getFullYear() - 1
          const month = today.getMonth() + 1
          const day = today.getDate()
          return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
        },
        maxDescription: 'one year ago'
      }
    }
  },
  betweenMinAndMax: {
    fields: {
      bought: {
        type: 'date',
        name: 'the date you bought your shed',
        min: '2022-01-01',
        minDescription: 'the date the shed went on sale',
        max: '2022-02-01',
        maxDescription: 'the last date the shed was on sale'
      }
    }
  }
}
