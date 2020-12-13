const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    sessionId: String,
    bio: {
      type: String,
      minlength: 3,
      maxlength: 300
    },
    profilePicture: String,
    role: {
      type: String,
      default: 'student'
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: true
      }
    ],
    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: true
      }
    ]
  },
  { timestamps: true }
)

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  populateFields: ['name, sessionId']
})

userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)
