const mongoose = require('mongoose')
const Chapter = require('./chapter')

const Course = new mongoose.Schema(
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
    chapters: {
      type: [Chapter],
      default: []
    },
    thumbnailUrl: String,
    students: {
      type: ['ObjectId'],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', Course)
