const express = require('express')
const router = express.Router()
const thumbnailStorage = require('../middleware/courseThumbnailStorage')
const lessonResourceStorage = require('../middleware/lessonResourceStorage')

const courseController = require('../controllers/course')

router.post('/', thumbnailStorage, courseController.createCourse)

router.get('/all', courseController.getAllCourses)

router.post('/:courseId/chapter', courseController.addChapter)

router.post('/:courseId/chapter/:chapterId/lesson', lessonResourceStorage, courseController.addLesson)

router.delete('/:courseId/chapter/:chapterId/lesson/:lessonId', courseController.deleteLesson)

module.exports = router
