const router = require('express').Router()
const validation = require('@nubz/gds-validation')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('../models')

const templatePath = 'task-lists/any-order/eligibility'

router.post('/do-you-have-a-shed', (req, res) => {
  const errors = validation.getPageErrors(req.body, models.eligibility.pages['do-you-have-a-shed'])
  if (errors.hasErrors) {
    res.render(templatePath + '/do-you-have-a-shed', {
      errors
    })
  } else {
    if (req.body['has-shed'] === 'Yes') {
      res.redirect('enter-shed-height')
    } else {
      req.session.data.ineligible = true
      res.redirect('ineligible')
    }
  }
})

router.post('/enter-shed-height', (req, res) => {
  const errors = validation.getPageErrors(req.body, models.eligibility.pages['enter-shed-height'])
  if (errors.hasErrors) {
    res.render(templatePath + '/enter-shed-height', {
      errors
    })
  } else {
    if (parseFloat(req.body['enter-shed-height']) > 120) {
      res.redirect('check-your-answers')
    } else {
      req.session.data.ineligible = true
      res.redirect('ineligible')
    }
  }
})

router.post('/check-your-answers', (req, res) => {
  res.redirect('../task-list')
})

router.get('/ineligible', (req, res) => {
  res.render(templatePath + '/ineligible', { back: req.headers.referer })
})

module.exports = router
