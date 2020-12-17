const mongoose = require('mongoose')
const Lesson = require('./lesson')

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      unique: true
    },
    description: {
      type: String,
      required: true,
      minlength: 3
    },
    lessons: [Lesson],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

chapterSchema.virtual('allLessons').get(function () {
  return this.lessons.map(lesson => ({
    title: lesson.title,
    estimatedCompletionTime: lesson.estimatedCompletionTime
  }))
})

chapterSchema.virtual('estimatedCompletionTimeOfChapter').get(function () {
  return this.lessons
          .map(lesson => lesson.estimatedCompletionTime)
          .reduce((a, b) => a + b)
})

module.exports = chapterSchema
