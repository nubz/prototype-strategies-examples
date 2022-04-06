const router = require('express').Router()
const taskList = require('@nubz/gds-task-list-ops')
// this is the schema our task list is defined by
const schema = require('./models')

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
    const taskStatus = taskList.returnTaskStatus(req.session.data, schema)
    const taskListComplete = taskList.taskListComplete(req.session.data, schema)
    res.render(templatePath, { taskStatus, taskListComplete })
  }
})


router.use('/eligibility', require('./eligibility/routes'))
router.use('/yourDetails', require('./yourDetails/routes'))

module.exports = router
