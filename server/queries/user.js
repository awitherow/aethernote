import bcrypt from 'bcrypt'
import db from '../db'

export const getUser = (username) => {
  console.log(username)

  return db.one('SELECT * from users WHERE username = ${username}', { username })
  .catch(e => console.log(e))
}

export const createUser = (username, password) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  console.log(hash)

  return db.one('insert into users(username, password) values( ${username}, ${password}) returning *', {
    username,
    password: hash,
  }).catch(e => console.log(e))
}