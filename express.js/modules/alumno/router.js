const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/', controller.getAll)
router.post('/', controller.create)
router.patch('/', controller.update)
router.put('/', controller.delete)

module.exports = router