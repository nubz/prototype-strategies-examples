const textInputHints = {
  maxLength: 'Anything you enter above 10 characters long will produce an error',
  minLength: 'Anything you enter below 4 characters long will produce an error',
  exactLength: 'Entering anything other than 3 characters will produce an error',
  betweenMinAndMax: 'Anything you enter below 4 or longer than 10 characters will produce an error',
  regex: 'Entering anything other than letters, numbers, spaces or hyphens will produce an error'
}

const currencyInputHints = {
  currencyMax: 'Anything you enter above £500 produce an error',
  currencyMin: 'Anything you enter below £10 will produce an error',
  exactLength: 'Entering anything other than 3 characters will produce an error',
  betweenMinAndMax: 'Anything you enter below £10 or above £100 will produce an error',
  currencyMaxField: 'Entering anything above the amount you enter in the "How much do you have in the bank?" field will produce an error',
  currencyMaxFieldFn: 'Entering anything above half the amount you enter in  "How much do you have in the bank?" field will produce an error'
}

const matchingHints = {
  matches: 'If you enter anything other than "123456" or "ABCDEF" you will see an error',
  exclusions: 'If you enter "123456" or "ABCDEF" you will see an error'
}

// because our validation script injects evaluated values for min amd max into our models we don't
// want to confuse developers by showing these values in the demo display of the models
const demoModel = obj => {
  const stripped = { ...obj }
  if (stripped.hasOwnProperty('fields')) {
    return Object.keys(stripped.fields).reduce((list, next) => {
      delete stripped.fields[next].evalMaxValue
      delete stripped.fields[next].evalMinValue
      delete stripped.fields[next].evalAfterDateValue
      delete stripped.fields[next].evalBeforeDateValue
      return stripped
    }, {})
  } else {
    return obj
  }
}

// function is written here purely to replicate that used in filters.js
// and allows the demo to print the function as an example
const dateErrorClasses = (inputs, key) => {
  if (key === 'year') {
    return inputs && inputs.includes(key) ? 'govuk-input--width-4 govuk-input--error' : 'govuk-input--width-4'
  }
  return inputs && inputs.includes(key) ? 'govuk-input--width-2 govuk-input--error' : 'govuk-input--width-2'
}

module.exports = {
  textInputHints,
  currencyInputHints,
  matchingHints,
  demoModel,
  dateErrorClasses
}
