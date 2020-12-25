const mongoose = require('mongoose')

const Lesson = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    content: {
      type: String,
      minlength: 3
    },
    resourceUrl: String
  },
  { timestamps: true }
)

module.exports = Lesson
