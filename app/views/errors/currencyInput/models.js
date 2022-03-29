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
        type: 'currency',
        name: 'how much you can spend',
        currencyMaxField: 'how much you have in the bank',
        getMaxCurrencyFromField: data => data.amountInBank
      },
      amountInBank: {
        type: 'currency',
        name: 'how much you have in the bank'
      }
    }
  }
}
