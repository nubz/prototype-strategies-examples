const router = require('express').Router()
const validation = require('@nubz/gds-validation')

// this router uses the same template throughout, with a variable hint message
// it also uses inline models in the post routes which does create a lot of code
// a better strategy might be to create a file to store model definitions and import
// it here, other examples here do use that way of importing models but these examples
// do show how to quickly validate a simple post route on an ad-hoc basis
const templatePath = 'errors/textInput/text-input'
const homeRoute = '../'

router.post('/text-input', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name'
      }
    }
  })

  if (errors.summary.length > 0) {
    res.render(templatePath, {
      errors: errors
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/text-input-maxLength', (req, res) => {
  res.render(templatePath, {
    hint: 'Anything you enter above 10 characters long will produce an error'
  })
})

router.post('/text-input-maxLength', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        maxLength: 10
      }
    }
  })

  if (errors.summary.length > 0) {
    res.render(templatePath, {
      errors: errors,
      hint: 'Anything you enter above 10 characters long will produce an error'
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/text-input-minLength', (req, res) => {
  res.render(templatePath, {
    hint: 'Anything you enter below 4 characters long will produce an error'
  })
})

router.post('/text-input-minLength', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        minLength: 4
      }
    }
  })

  if (errors.summary.length > 0) {
    res.render(templatePath, {
      errors: errors,
      hint: 'Anything you enter below 4 characters long will produce an error'
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/text-input-exactLength', (req, res) => {
  res.render(templatePath, {
    hint: 'Entering anything other than 3 characters will produce an error'
  })
})

router.post('/text-input-exactLength', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        exactLength: 3
      }
    }
  })

  if (errors.summary.length > 0) {
    res.render(templatePath, {
      errors: errors,
      hint: 'Entering anything other than 3 characters will produce an error'
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/text-input-regex', (req, res) => {
  res.render(templatePath, {
    hint: 'Entering anything other than letters, numbers, spaces or hyphens will produce an error'
  })
})

router.post('/text-input-regex', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        regex: /^[0-9A-Za-z\s-']+$/,
        patternText: 'Your company name must only include letters, numbers, spaces, apostrophes or hyphens'
      }
    }
  })

  if (errors.summary.length > 0) {
    res.render(templatePath, {
      errors: errors,
      hint: 'Entering anything other than letters, numbers, spaces or hyphens will produce an error'
    })
  } else {
    res.redirect(homeRoute)
  }
})

module.exports = router
