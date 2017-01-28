import moment from 'moment'
import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'
import { validateLoginForm, validateSignupForm } from '../validation'
import { getUser, createUser } from './user'

function comparePass(userPassword, hash) {
  console.log("compare", {
    userPassword,
    hash
  })
  const bool = bcrypt.compareSync(userPassword, hash)
  if (!bool) throw new Error('bad pass silly money')
  else return true
}

export const encodeToken = (user) => {
  console.log(user)
  return jwt.encode({
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id,
  }, process.env.TOKEN_SECRET)
}

export const decodeToken = (token, cb) => {
  const now = (moment().unix())
  const payload = jwt.decode(token, process.env.TOKEN_SECRET)
  const exp = payload.exp
  now > exp ? cb('Token has expired.') : cb(null, payload)
}

export const AttemptLogin = (req, res) => {
  const validationResult = validateLoginForm(req.body)
  !validationResult.success
    ? res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    }) : getUser(req.body.username).then((res) => {
      console.log("response is", res)
      console.log('checking password with', req.body.password, res.password)
      comparePass(req.body.password, res.password)
      console.log('password passed check', res)
      return res
    }).then((res) => encodeToken(res))
      .then(token => {
        console.log(token)
        return res.status(200).json({
          status: 'success',
          token,
        })}
    ).catch((error) => 
      res.status(500).json({
        status: 'error',
        error,
      })
    )
}

export const AttemptSignup = (req, res) => {
  const validationResult = validateSignupForm(req.body)
  !validationResult.success
    ? res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    })
    : createUser(req.body.username, req.body.password).then((res) => {
      comparePass(req.body.password, res.password)
      return res
    }).then((res) => encodeToken(res))
      .then((token) => {
        res.status(200).json({
          status: 'success',
          token,
        })
      }).catch(() => {
        res.status(500).json({
          status: 'error',
        })
      })
}