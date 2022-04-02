const router = require('express').Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('errors/index')
})
router.use('/textInputInlineModels', require('./textInputInlineModels/routes'))
router.use('/textInput', require('./textInput/routes'))
router.use('/currencyInput', require('./currencyInput/routes'))
router.use('/dates', require('./dates/routes'))
module.exports = router
