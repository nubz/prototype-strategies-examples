// these models are all for the same field and would not normally use
// the validation rules in their name - this is demo protocol only!

module.exports = {
  canSpend: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend'
      }
    }
  },
  canSpendMax: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        max: 500
      }
    }
  },
  canSpendMin: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        min: 10
      }
    }
  },
  canSpendBetweenMinMax: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        min: 10,
        max: 100
      }
    }
  },
  canSpendMaxOtherField: {
    fields: {
      amountInBank: {
        type: 'currency',
        name: 'how much you have in the bank'
      },
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        maxDescription: 'how much you have in the bank', // this description of the other field will be used in the currencyMaxField error case
        max: 'amountInBank' // this means it must be less than the value of amountInBank
      }
    }
  },
  canSpendMaxHalfOtherField: {
    fields: {
      amountInBank: {
        type: 'currency',
        name: 'how much you have in the bank'
      },
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        maxDescription: 'half of what you have in the bank', // this description of the rule encapsulated by the function below
        max: data => data.amountInBank ?
          parseFloat(data.amountInBank) * 0.5 : data.spend // returning the self amount (data.spend) if we cannot evaluate the amountInBank ensures this type of error is not thrown when amountInBank has yet to be completed
      }
    }
  }
}
