const router = require('express').Router()
const taskList = require('@nubz/gds-task-list-ops')
// this is the schema our task list is defined by
const schema = require('./models')
const { demoModel } = require('../../../demo/demoUtils')

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
  const data = req.session.data
  if (data.ineligible) {
    res.redirect('eligibility/ineligible')
  } else {
    const taskStatus = taskList.returnTaskStatus(data, schema)
    const taskListComplete = taskList.taskListComplete(data, schema)
    res.render(templatePath, { taskStatus, taskListComplete, demoModel: demoModel(schema) })
  }
})

router.use('/eligibility', require('./eligibility/routes'))
router.use('/yourDetails', require('./yourDetails/routes'))

module.exports = router
