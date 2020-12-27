const express = require('express')
const router = express.Router()

const courseController = require('../controllers/course')
const courseThumbnailStorage = require('../middleware/courseThumbnailStorage')

router.post('/', courseThumbnailStorage, courseController.createCourse)

router.get('/all', courseController.getAllCourses)

module.exports = router
