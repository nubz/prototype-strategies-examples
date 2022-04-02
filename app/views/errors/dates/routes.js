const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')
// this import is for the demo only
const { demoModel } = require('../../../demo/demoUtils')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/dates/date-inputs'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('errors/index', { folder: 'dates' })
})

router.get('/required', (req, res) => {
  res.render(templatePath, {
    demoModel: demoModel(models.dateBought) // this is NOT required for your templates - this is purely for demo display
  })
})

router.post('/required', (req, res) => {
  // this pattern is repeated throughout all post handlers, first
  // we call getPageErrors passing in the data containing user answers,
  // in this case that's all in the request body, alongside the model containing
  // the rules to validate against, and then see if there are any errors, if so then
  // render them to the user, if not then move on to whatever we do next
  const errors = getPageErrors(req.body, models.dateBought)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.dateBought) // NOT required for validating models - this is purely for demo display
    })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.post('/beforeToday', (req, res) => {
  const errors = getPageErrors(req.body, models.dateBeforeToday)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.dateBeforeToday) // NOT required for validating models - this is purely for demo display
    })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

module.exports = router
