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

router.get('/task-list', (req, res) => {
  const taskStatus = taskList.returnTaskStatus(req.session.data, models)
  console.log('taskStatus', taskStatus)
  res.render(templatePath, { taskStatus })
})

router.use('/eligibility', require('./eligibility/routes'))

module.exports = router
