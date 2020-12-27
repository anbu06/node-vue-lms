const Validator = require('async-validator').default

const Course = require('../models/course')

exports.createCourse = async (req, res, next) => {
  const descriptor = {
    title: [
      { required: true, message: 'Course title is required.\n' },
      { min: 3, message: 'Course title should have a minimum length of 3 characters.\n' },
      { max: 200, message: 'Course title should have a maximum length of 200 characters.\n' }
    ],
    description: [
      { required: true, message: 'Course description is required.\n' },
      { min: 3, message: 'Course description should have a minimum length of 3 characters.\n' }
    ]
  }

  const validator = new Validator(descriptor)


  const courseRequest = {
    title: req.body.title,
    description: req.body.description,
    // categories: req.body.categories,
    thumbnail: req.file.path.replace('/app/src', '/api')
  }

  try {
    await validator.validate({ title: req.body.title, description: req.body.description })
  } catch ({ errors }) {
    return next({ message: errors.map(e => e.message).join('') })
  }

  const course = new Course(courseRequest)

  try {
    await course.save()

    req.user.createdCourses.push(course)
    await req.user.save()

    res.send(course)
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

exports.addChapter = async (req, res, next) => {
  const chapter = {
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user._id
  }

  const course = await Course.findById(req.params.courseId)

  course.chapters.push(chapter)

  try {
    await course.save()

    res.sendStatus(201)
  } catch (e) {
    return next(e)
  }
}
