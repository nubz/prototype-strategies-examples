const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/textInput/text-input'
const multipleFieldsTemplatePath = 'errors/textInput/multiple-text-inputs'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found
// this import is for the demo only
const { demoModel, textInputHints } = require('../../../demo/demoUtils')

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('errors/index', { folder: 'textInput' })
})

router.get('/required', (req, res) => {
  res.render(templatePath, { demoModel: demoModel(models.companyNameRequired) })
})

router.post('/required', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameRequired)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.companyNameRequired) // NOT required for validating models - this is purely for demo display
    })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.get('/maxLength', (req, res) => {
  res.render(templatePath, {
    hint: textInputHints.maxLength, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.companyNameMaxLength) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/maxLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameMaxLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors, // we need to pass in the errors for use by the template
      hint: textInputHints.maxLength, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.companyNameMaxLength) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/minLength', (req, res) => {
  res.render(templatePath, {
    hint: textInputHints.minLength, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.companyNameMinLength) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/minLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameMinLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      hint: textInputHints.minLength, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.companyNameMinLength) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/betweenMinAndMax', (req, res) => {
  res.render(templatePath, {
    hint: textInputHints.betweenMinAndMax, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.companyNameBetweenMinMax) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/betweenMinAndMax', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameBetweenMinMax)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      hint: textInputHints.betweenMinAndMax, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.companyNameBetweenMinMax) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/exactLength', (req, res) => {
  res.render(templatePath, {
    hint: textInputHints.exactLength, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.companyNameExactLength) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/exactLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameExactLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors, // we need to pass in the errors for use by the template
      hint: textInputHints.exactLength, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.companyNameExactLength) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/regex', (req, res) => {
  res.render(templatePath, {
    hint: textInputHints.regex, // NOT required for validating models - this is purely for demo display
    demoModel: demoModel(models.companyNameRegex) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/regex', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameRegex)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors, // we need to pass in the errors for use by the template
      hint: textInputHints.regex, // NOT required for validating models - this is purely for demo display
      demoModel: demoModel(models.companyNameRegex) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/bankDetails', (req, res) => {
  res.render(multipleFieldsTemplatePath, {
    demoModel: demoModel(models.bankDetails) // NOT required for validating models - this is purely for demo display
  })
})

router.post('/bankDetails', (req, res) => {
  const errors = getPageErrors(req.body, models.bankDetails)
  if (errors.hasErrors) {
    res.render(multipleFieldsTemplatePath, {
      errors: errors, // we need to pass in the errors for use by the template
      demoModel: demoModel(models.bankDetails) // NOT required for validating models - this is purely for demo display
    })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
