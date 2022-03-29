const router = require('express').Router()
const { getPageErrors } = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')

// this router uses the same template throughout, with a variable hint message
const templatePath = 'errors/textInput/text-input'
const homeRoute = './' // we treat returning to demo home as success, i.e. no errors found
// convenient map of form hints (NOT error messages) to use in our single template, not related to error handling
// if we didn't use this mechanism there probably would be no GET handlers required for those pages
const hints = {
  maxLength: 'Anything you enter above 10 characters long will produce an error',
  minLength: 'Anything you enter below 4 characters long will produce an error',
  exactLength: 'Entering anything other than 3 characters will produce an error',
  regex: 'Entering anything other than letters, numbers, spaces or hyphens will produce an error'
}

router.get('/', (req, res) => {
  res.render('errors/index', { folder: 'textInput' })
})

router.get('/required', (req, res) => {
  res.render(templatePath)
})

router.post('/required', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameRequired)
  if (errors.hasErrors) {
    // re-render same template with errors
    res.render(templatePath, { errors })
  } else {
    // success, page is valid
    res.redirect(homeRoute)
  }
})

router.get('/maxLength', (req, res) => {
  res.render(templatePath, {
    hint: hints.maxLength
  })
})

router.post('/maxLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameMaxLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors,
      hint: hints.maxLength
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/minLength', (req, res) => {
  res.render(templatePath, {
    hint: hints.minLength
  })
})

router.post('/minLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameMinLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors,
      hint: hints.minLength
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/exactLength', (req, res) => {
  res.render(templatePath, {
    hint: hints.exactLength
  })
})

router.post('/exactLength', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameExactLength)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors,
      hint: hints.exactLength
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/regex', (req, res) => {
  res.render(templatePath, {
    hint: hints.regex
  })
})

router.post('/regex', (req, res) => {
  const errors = getPageErrors(req.body, models.companyNameRegex)
  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors,
      hint: hints.regex
    })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
