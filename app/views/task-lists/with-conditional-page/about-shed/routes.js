const router = require('express').Router()
const validation = require('@nubz/gds-validation')
const { schema } = require('../models')

const templatePath = 'task-lists/sequenced/about-shed'

router.post('/is-shed-outdoors', (req, res) => {
  const errors = validation.getPageErrors(req.body, schema.aboutShed.pages['is-shed-outdoors'])
  if (errors.hasErrors) {
    res.render(templatePath + '/is-shed-outdoors', {
      errors
    })
  } else {
    res.redirect('is-shed-built')
  }
})

router.post('/is-shed-built', (req, res) => {
  const errors = validation.getPageErrors(req.body, schema.aboutShed.pages['is-shed-built'])
  if (errors.hasErrors) {
    res.render(templatePath + '/is-shed-built', {
      errors
    })
  } else {
    if (req.body['shed-built'] === 'Yes') {
      res.redirect('how-many-windows')
    } else {
      delete req.session.data['how-many-windows']
      res.redirect('check-your-answers')
    }

  }
})

router.post('/how-many-windows', (req, res) => {
  const errors = validation.getPageErrors(req.body, schema.aboutShed.pages['how-many-windows'])
  if (errors.hasErrors) {
    res.render(templatePath + '/how-many-windows', {
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
