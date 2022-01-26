const router = require('express').Router()

router.use('/textInput', require('./textInput/routes'))
module.exports = router
