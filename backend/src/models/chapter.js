const mongoose = require('mongoose')
const Lesson = require('./chapter')

const Chapter = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    description: {
      type: String,
      minlength: 3
    },
    lessons: {
      type: [Lesson],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = Chapter
