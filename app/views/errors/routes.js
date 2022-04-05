const router = require('express').Router()
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('errors/index')
})
router.use('/textInputInlineModels', require('./textInputInlineModels/routes'))
router.use('/textInput', require('./textInput/routes'))
router.use('/currencyInput', require('./currencyInput/routes'))
router.use('/dates', require('./dates/routes'))
router.use('/radios', require('./radios/routes'))
router.use('/matches', require('./matches/routes'))
module.exports = router
