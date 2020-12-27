const Course = require('../models/course')

exports.createCourse = async (req, res, next) => {
  const courseRequest = {
    title: req.body.title,
    description: req.body.description,
    thumbnailUrl: req.file.path.replace('/app/src', '/api')
  }

  const course = new Course(courseRequest)

  try {
    await course.save()

    req.user.courses.push(course)
    await req.user.save()

    res.sendStatus(201)
  } catch (e) {
    return next(e)
  }
}

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()

    res.status(200).send(courses)
  } catch (e) {
    return next(e)
  }
}
