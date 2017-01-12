const moment = require('moment')
const jwt = require('jwt-simple')
import { validateLoginForm, validateSignupForm } from '../validation'
import { getUser } from './user'

export const encodeToken = (user) =>
  jwt.encode({
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  }, process.env.TOKEN_SECRET)

export const decodeToken = (token, cb) =>
  (moment().unix() > jwt.decode(token, process.env.TOKEN_SECRET).exp)
    ? callback('Token has expired.')
    : callback(null, payload)

export const AttemptLogin = (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  validationResult
    ? res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
    : getUser(req.body.username).then((res) => {
      comparePass(req.body.pasword, response.password)
      return response
    })
      .then((res) => localAuth.encodeToken(res))
      .then((token) => {
        res.status(200).json({
          status: 'success',
          token: token
        })
      }).catch((err) => {
        res.status(500).json({
          status: 'error'
        })
      })
}

export const AttemptSignup = (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  validationResult
    ? res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
    : createUser(req.body.username).then((res) => {
      comparePass(req.body.pasword, response.password)
      return response
    }).then((res) => localAuth.encodeToken(res))
      .then((token) => {
        res.status(200).json({
          status: 'success',
          token: token
        })
      }).catch((err) => {
        res.status(500).json({
          status: 'error'
        })
      })
}

export const ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    })
  }

  var header = req.headers.authorization.split(' ')
  var token = header[1]
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      })
    } else {
      getUser(req.body.username).then((user) => {
        next()
      }).catch((err) => {
        res.status(500).json({
          status: 'error'
        })
      })
    }
  })
}