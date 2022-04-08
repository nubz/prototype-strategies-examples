const router = require('express').Router()
const validation = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const { schema } = require('../models')

const templatePath = 'task-lists/sequenced/yourDetails'

router.post('/enter-name', (req, res) => {
  const errors = validation.getPageErrors(req.body, schema.yourDetails.pages['enter-name'])
  if (errors.hasErrors) {
    res.render(templatePath + '/enter-name', {
      errors
    })
  } else {
    res.redirect('enter-date-of-birth')
  }
})

router.post('/enter-date-of-birth', (req, res) => {
  const errors = validation.getPageErrors(req.body, schema.yourDetails.pages['enter-date-of-birth'])
  if (errors.hasErrors) {
    res.render(templatePath + '/enter-date-of-birth', {
      errors
    })
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/check-your-answers', (req, res) => {
  res.redirect('../task-list')
})

module.exports = router
