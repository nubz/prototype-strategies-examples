const router = require('express').Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('task-lists/index')
})
router.use('/any-order', require('./any-order/routes'))
router.use('/sequenced', require('./sequenced/routes'))
module.exports = router
