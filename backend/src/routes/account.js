const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../controllers/user')

const preventLoginForLoggedInUsers = (req, res, next) => {
  next(req.user && new Error('User is already logged in'))
}

router.post('/register', userController.register)

router.get('/session', userController.checkLogin)

router.post(
  '/session',
  preventLoginForLoggedInUsers,
  passport.authenticate('local', { failWithError: true }),
  userController.login,
  (err, req, res, next) => {
    if (err.status != 401) return next(err)

    next(
      new Error('The username and password you provided did not match our records. Please double-check and try again.')
    )
  }
)

router.delete('/session', userController.logout)

module.exports = router
