const express = require('express')
const router = express.Router()
const passport = require('passport')

const accountController = require('../controllers/account')

router.post('/register', accountController.register)

router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  accountController.login,
  (err, req, res, next) => {
    if (err.status != 401) return next(err)

    next(
      new Error('The username and password you provided did not match our records. Please double-check and try again.')
    )
  }
)

router.get('/session', accountController.fetchSession)

router.delete('/logout', accountController.logout)

module.exports = router
