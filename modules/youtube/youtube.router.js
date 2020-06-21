const express = require('express')
const router =express.Router()

const controller = require('./youtube.controller')

router.get('/get/videos',controller.getVideoList)


module.exports = router