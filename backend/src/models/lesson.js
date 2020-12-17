const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100
    },
    content: {
      type: String,
      required: true,
      minlength: 3
    },
    resources: String,
    estimatedCompletionTime: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = lessonSchema
