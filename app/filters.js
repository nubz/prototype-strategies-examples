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
  filters.prettyFilter = model => `<div class="show-model"><pre>filters.dateErrorClasses = ${pretty(model, 2, 'PRINT', true)}</pre></div>`

  return filters
}
