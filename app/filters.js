const pretty = require('js-object-pretty-print').pretty // for demo display only
module.exports = function (env) {
  const filters = {}

  filters.dateErrorClasses = (inputs, key) => {
    if (key === 'year') {
      return inputs && inputs.includes(key) ? 'govuk-input--width-4 govuk-input--error' : 'govuk-input--width-4'
    }
    return inputs && inputs.includes(key) ? 'govuk-input--width-2 govuk-input--error' : 'govuk-input--width-2'
  }
  /* ------------------------------------------------------------------
    This is for demo code only - NOT required for validating templates
  ------------------------------------------------------------------ */
  filters.prettyModel = model => `<div class="show-model"><em>Errors passed into this page are returned by this assignment in the route handler, where the 2nd argument is the page model:</em> <pre>const errors = getPageErrors(req.body, ${pretty(model, 2, 'PRINT', true)}</pre></div>`
  filters.prettySchema = model => `<div class="show-model"><em>The schema shows tasks and the pages within:</em> <pre>${pretty(model, 2, 'PRINT', true)}</pre></div>`
  filters.prettyStatus = model => `<div class="show-model"><em><pre>taskListStatus(data, schema)</pre> has returned:</em> <pre>${pretty(model, 2, 'PRINT', true)}</pre></div>`
  filters.prettyFilter = model => `<div class="show-model"><pre>filters.dateErrorClasses = ${pretty(model, 2, 'PRINT', true)}</pre>This filter, purely for GOV.UK prototypes, can be applied to the list of inputs that is returned inside any error for the field and used for the class attribute of your date inputs, passing whether it's 'day', 'month' or 'year' also <pre>class="{{ errors.inline['your-field-name'].inputs | dateErrorClasses('day') }}"</pre></div>`
  return filters
}
