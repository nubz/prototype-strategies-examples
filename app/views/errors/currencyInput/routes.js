const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/currencyInput/text-input'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found
// convenient map of form hints (NOT error messages) to use in our single template, not related to error handling
// if we didn't use this mechanism there probably would be no GET handlers required for those pages
const hints = {
  currencyMax: 'Anything you enter above £500 produce an error',
  currencyMin: 'Anything you enter below £10 will produce an error',
  exactLength: 'Entering anything other than 3 characters will produce an error',
  betweenMinAndMax: 'Anything you enter below £10 or above £100 will produce an error',
  currencyMaxField: 'Entering anything above the amount you enter in the "How much do you have in the bank?" field will produce an error'
}

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('errors/index', { folder: 'currencyInput' })
})

router.get('/required', (req, res) => {
  res.render(templatePath)
})

router.post('/required', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpend)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, { errors })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.get('/currencyMax', (req, res) => {
  res.render(templatePath, {
    hint: hints.currencyMax
  })
})

router.post('/currencyMax', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMax)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors,
      hint: hints.currencyMax
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/currencyMin', (req, res) => {
  res.render(templatePath, {
    hint: hints.currencyMin
  })
})

router.post('/currencyMin', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMin)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors,
      hint: hints.currencyMin
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/betweenMinAndMax', (req, res) => {
  res.render(templatePath, {
    hint: hints.betweenMinAndMax
  })
})

router.post('/betweenMinAndMax', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendBetweenMinMax)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors,
      hint: hints.betweenMinAndMax
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/currencyMaxField', (req, res) => {
  res.render('errors/currencyInput/multiple-text-inputs')
})

router.post('/currencyMaxField', (req, res) => {
  const errors = getPageErrors(req.body, models.canSpendMaxOtherField)
  if (errors.hasErrors) {
    res.render('errors/currencyInput/multiple-text-inputs', { errors })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
