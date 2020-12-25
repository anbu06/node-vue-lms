const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const autopopulate = require('mongoose-autopopulate')

const User = new mongoose.Schema(
  {
    name: String,
    sessionId: String,
    courses: [
      {
        type: 'ObjectId',
        ref: 'Course',
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
)

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  populateFields: ['name, sessionId'],
})

User.plugin(autopopulate)

module.exports = mongoose.model('User', User)
