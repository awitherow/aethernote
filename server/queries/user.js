import bcrypt from 'bcrypt'
import db from '../db'

export const getUser = (req, res, next) =>
    db.one(`select * from entries where id = ${req.params.id}`)
        .then(data => res.status(200).json({
          status: 'success',
          data,
          message: 'Retrieved user',
        })).catch(err => next(err))

export const createUser = (req, res, next) => {
  const { username, password } = req.body
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  db.none('insert into users(username, password) values( ${username}, ${password})', {
    username,
    password: hash,
  }).then(() =>
        res.status(200).json({
          status: 'success',
          message: 'Inserted one entry',
        })).catch(err => next(err))
}