const router = require('express').Router()
const taskList = require('@nubz/gds-task-list-ops')
// this is the schema our task list is defined by
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
