const router = require('express').Router()
const taskList = require('@nubz/gds-task-list-ops')
// here we import a models file to simplify the router code, models files can
// also become schemas for task list or whole site validations, a more ad-hoc
// way for validating only some routes or a single route in our prototypes
// could be to describe the page models inline instead (see textInputInlineModels)
const { schema } = require('./models')

const templatePath = 'task-lists/sequenced/task-list'

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('sequenced/index', { folder: 'task-lists' })
})

router.get('/task-list', (req, res) => {
  const taskStatus = taskList.returnTaskStatus(req.session.data, schema)
  console.log('taskStatus = ', taskStatus)
  const taskListComplete = taskList.taskListComplete(req.session.data, schema)
  res.render(templatePath, { taskStatus, taskListComplete })
})

router.use('/eligibility', require('./eligibility/routes'))
router.use('/yourDetails', require('./yourDetails/routes'))

module.exports = router
