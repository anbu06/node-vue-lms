const mongoose = require('mongoose')
const User = require('./user')
const Chapter = require('./chapter')

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true
    },
    description: {
      type: String,
      required: true,
      minlength: 3
    },
    thumbnail: {
      type: String,
      default: ''
    },
    categories: {
      type: [String],
      default: []
    },
    chapters: {
      type: [Chapter],
      default: []
    },
    voters: {
      type: ['ObjectId'],
      default: []
    },
    students: {
      type: ['ObjectId'],
      default: []
    },
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

courseSchema.virtual('votes').get(function () {
  return this.voters.length
})

courseSchema.virtual('totalChapters').get(function () {
  return this.chapters.length
})

courseSchema.virtual('totalStudents').get(function () {
  return this.students.length
})

module.exports = mongoose.model('Course', courseSchema)
