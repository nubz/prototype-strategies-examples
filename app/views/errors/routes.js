const router = require('express').Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('errors/index')
})
router.use('/textInput', require('./textInput/routes'))
module.exports = router
