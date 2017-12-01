const app = require('../server.js')
const router = require('express').Router()
const urlController = require('../controllers/controller.js')


router.get('/getUrls', urlController.getUrls)
router.post('/postUrl', urlController.postUrl)

module.exports = router