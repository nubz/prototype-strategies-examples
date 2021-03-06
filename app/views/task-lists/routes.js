const router = require('express').Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('task-lists/index')
})
router.use('/any-order', require('./any-order/routes'))
router.use('/sequenced', require('./sequenced/routes'))
router.use('/with-cya', require('./with-cya/routes'))
router.use('/with-conditional-page', require('./with-conditional-page/routes'))
module.exports = router
