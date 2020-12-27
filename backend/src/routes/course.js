const express = require('express')
const router = express.Router()
const thumbnailStorage = require('../middleware/courseThumbnailStorage')

const courseController = require('../controllers/course')

router.post('/', thumbnailStorage, courseController.createCourse)

router.get('/all', courseController.getAllCourses)

router.post('/:courseId/chapter', courseController.addChapter)

module.exports = router
