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
  filters.prettyFilter = model => `<div class="show-model"><pre>filters.dateErrorClasses = ${pretty(model, 2, 'PRINT', true)}</pre>This filter can be applied to the list of inputs that are returned inside errors for the field and used for the class attribute of your date inputs <pre>class="{{ errors.inline['your-field-name'].inputs | dateErrorClasses }}"</pre></div>`

  return filters
}
