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
        currencyMax: 500
      }
    }
  },
  canSpendMin: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        currencyMin: 10
      }
    }
  },
  canSpendBetweenMinMax: {
    fields: {
      spend: {
        type: 'currency',
        name: 'how much you can spend',
        currencyMin: 10,
        currencyMax: 100
      }
    }
  },
  canSpendMaxOtherField: {
    fields: {
      spend: {
        includeIf: data => data.amountInBank, // here we are saying don't validate unless there is an amount to compare to
        type: 'currency',
        name: 'how much you can spend',
        currencyMaxField: 'how much you have in the bank',
        getMaxCurrencyFromField: data => data.amountInBank // this means it must be less than the value of amountInBank
      },
      amountInBank: {
        type: 'currency',
        name: 'how much you have in the bank'
      }
    }
  }
}
