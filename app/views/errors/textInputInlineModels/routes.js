const router = require('express').Router()
const validation = require('@nubz/gds-validation')

// this router uses the same template throughout, with a variable hint message
// it also uses inline models in the post routes which does create a lot of code
// a better strategy might be to create a file to store model definitions and import
// it here, other examples here do use that way of importing models but these examples
// do show how to quickly validate a simple post route on an ad-hoc basis
const templatePath = 'errors/textInput/text-input'
const homeRoute = '../'
// convenient map of form hints (NOT error messages) to use in our single template, not related to error handling
// if we didn't use this mechanism there probably would be no GET handlers required for those pages
const hints = {
  maxLength: 'Anything you enter above 10 characters long will produce an error',
  minLength: 'Anything you enter below 4 characters long will produce an error',
  exactLength: 'Entering anything other than 3 characters will produce an error',
  regex: 'Entering anything other than letters, numbers, spaces or hyphens will produce an error'
}

router.get('/required', (req, res) => {
  res.render(templatePath)
})

router.post('/required', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'nonEmptyString',
        name: 'your company name'
      }
    }
  })

  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors
    })
  } else {
    res.redirect(homeRoute)
  }
})

router.get('/maxLength', (req, res) => {
  res.render(templatePath, {
    hint: hints.maxLength
  })
})

router.post('/maxLength', (req, res) => {
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        maxLength: 10
      }
    }
  })

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
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        minLength: 4
      }
    }
  })

  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors,
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
  const errors = validation.getPageErrors(req.body, {
    fields: {
      'company-name': {
        type: 'optionalString',
        name: 'your company name',
        exactLength: 3
      }
    }
  })

  if (errors.hasErrors) {
    res.render(templatePath, {
      errors: errors,
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
