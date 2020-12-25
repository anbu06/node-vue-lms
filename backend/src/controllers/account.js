const User = require('../models/user')

exports.register = async (req, res, next) => {
  try {
    let createdUser = new User(req.body.user)

    const user = await User.register(createdUser, req.body.user.password)

    req.session.userId = user._id
    req.session.save()

    res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
}

exports.login = (req, res) => {
  res.send(req.user)
}

exports.fetchSession = (req, res) => {
  res.send(req.user)
}

exports.logout = async (req, res) => {
  await req.logout()

  res.sendStatus(200)
}
