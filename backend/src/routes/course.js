const express = require('express')
const router = express.Router()
const thumbnailStorage = require('../middleware/courseThumbnailStorage')

const courseController = require('../controllers/course')

router.post('/', thumbnailStorage, courseController.createCourse)

router.get('/', courseController.getMyCourses)

module.exports = router
