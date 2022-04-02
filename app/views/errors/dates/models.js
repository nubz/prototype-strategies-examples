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
  }
}
