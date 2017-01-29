import bcrypt from 'bcrypt'
import db from '../db'

export const getUser = (username) =>
  db.one('SELECT * from users WHERE username = ${username}', { username })
  .catch(e => new Error(e))


export const createUser = (username, password) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return db.one('insert into users(username, password) values( ${username}, ${password}) returning *', {
    username,
    password: hash,
  }).catch(e => new Error(e))
}