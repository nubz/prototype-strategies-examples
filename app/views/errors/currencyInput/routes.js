const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')
// this import is for the demo only
const { demoModel, currencyInputHints } = require('../../../demo/demoUtils')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/currencyInput/text-input'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('errors/index', { folder: 'currencyInput' })
})

router.get('/required', (req, res) => {
  res.render(templatePath, {
    demoModel: demoModel(models.canSpend) // this is NOT required for your templates - this is purely for demo display
  })
})

router.post('/required', (req, res) => {
  // this pattern is repeated throughout all post handlers, first
  // we call getPageErrors passing in the data containing user answers,
  // in this case that's all in the request body, alongside the model containing
  // the rules to validate against, and then see if there are any errors, if so then
  // render them to the user, if not then move on to whatever we do next
  const errors = getPageErrors(req.body, models.canSpend)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.canSpend) // NOT required for templates - this is purely for demo display
    })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.get('/currencyMax', (req, res) => {
  res.render(templatePath, {
    hint: currencyInputHints.currencyMax, // NOT required for templates - this is purely for demo display
    demoModel: demoModel(models.canSpendMax) // NOT required for templates - this is purely for demo display
  })
})

router.post('/currencyMax', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMax)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors, // we need to pass in the errors for use by the template
      hint: currencyInputHints.currencyMax, // NOT required for templates - this is purely for demo display
      demoModel: demoModel(models.canSpendMax) // NOT required for templates - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/currencyMin', (req, res) => {
  res.render(templatePath, {
    hint: currencyInputHints.currencyMin, // NOT required for templates - this is purely for demo display
    demoModel: demoModel(models.canSpendMin) // NOT required for templates - this is purely for demo display
  })
})

router.post('/currencyMin', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMin)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      hint: currencyInputHints.currencyMin, // NOT required for templates - this is purely for demo display
      demoModel: demoModel(models.canSpendMin) // NOT required for templates - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/betweenMinAndMax', (req, res) => {
  res.render(templatePath, {
    hint: currencyInputHints.betweenMinAndMax, // NOT required for templates - this is purely for demo display
    demoModel: demoModel(models.canSpendBetweenMinMax) // NOT required for templates - this is purely for demo display
  })
})

router.post('/betweenMinAndMax', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendBetweenMinMax)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      hint: currencyInputHints.betweenMinAndMax, // NOT required for templates - this is purely for demo display
      demoModel: demoModel(models.canSpendBetweenMinMax) // NOT required for templates - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/currencyMaxField', (req, res) => {
  res.render('errors/currencyInput/multiple-text-inputs', {
    hint: currencyInputHints.currencyMaxField, // NOT required for templates - this is purely for demo display
    demoModel: demoModel(models.canSpendMaxOtherField) // NOT required for templates - this is purely for demo display
  })
})

router.post('/currencyMaxField', (req, res) => {
  // in this instance where we refer to another field (in the model), it so happens
  // that field is on the same page so is contained within the request body
  // if the field had been from another page or a computed value somewhere
  // we could pass in req.session.data instead of req.body as the validator
  // will require access to the value of other named fields
  const errors = getPageErrors(req.body, models.canSpendMaxOtherField)
  if (errors.hasErrors) {
    res.render('errors/currencyInput/multiple-text-inputs', {
      errors, // we need to pass in the errors for use by the template
      hint: currencyInputHints.currencyMaxField, // NOT required for templates - this is purely for demo display
      demoModel: demoModel(models.canSpendMaxOtherField) // NOT required for templates - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/currencyMaxHalfField', (req, res) => {
  res.render('errors/currencyInput/multiple-text-inputs', {
    hint: currencyInputHints.currencyMaxFieldFn, // NOT required for templates - this is purely for demo display
    demoModel: demoModel(models.canSpendMaxHalfOtherField) // NOT required for templates - this is purely for demo display
  })
})

router.post('/currencyMaxHalfField', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMaxHalfOtherField)
  if (errors.hasErrors) {
    res.render('errors/currencyInput/multiple-text-inputs', {
      errors, // we need to pass in the errors for use by the template
      hint: currencyInputHints.currencyMaxFieldFn, // NOT required for templates - this is purely for demo display
      demoModel: demoModel(models.canSpendMaxHalfOtherField) // NOT required for templates - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
