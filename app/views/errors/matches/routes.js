const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/matches/text-input'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found
// this import is for the demo only
const { demoModel, matchingHints } = require('../../../demo/demoUtils')

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('errors/index', { folder: 'matches' })
})

router.get('/matches', (req, res) => {
  res.render(templatePath, { demoModel: demoModel(models.idRef), hint: matchingHints.matches })
})

router.post('/matches', (req, res) => {
  const errors = getPageErrors(req.body, models.idRef)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.idRef), // NOT required for validating models - this is purely for demo display
      hint: matchingHints.matches // NOT required for validating models - this is purely for demo display
    })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.get('/exclusions', (req, res) => {
  res.render(templatePath, {
    hint: matchingHints.exclusions, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.idRefExclusions) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/exclusions', (req, res) => {
  const errors = getPageErrors(req.body, models.idRefExclusions)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors, // we need to pass in the errors for use by the template
      hint: matchingHints.exclusions, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.idRefExclusions) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
