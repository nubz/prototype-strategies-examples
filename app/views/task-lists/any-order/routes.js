const router = require('express').Router()
const taskList = require('@nubz/gds-task-list-ops')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const models = require('./models')

const templatePath = 'task-lists/any-order/task-list'

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('any-order/index', { folder: 'task-lists' })
})

router.get('/start-again', (req, res) => {
  req.session.destroy()
  res.redirect('task-list')
})

router.get('/task-list', (req, res) => {
  if (req.session.data.ineligible) {
    res.redirect('eligibility/ineligible')
  } else {
    const taskStatus = taskList.returnTaskStatus(req.session.data, models)
    res.render(templatePath, { taskStatus })
  }
})


router.use('/eligibility', require('./eligibility/routes'))
router.use('/yourDetails', require('./yourDetails/routes'))

module.exports = router
