const express = require('express')
const router = express.Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index')
})
router.use('/errors', require('./views/errors/routes'))
router.use('/task-lists', require('./views/task-lists/routes'))
module.exports = router
