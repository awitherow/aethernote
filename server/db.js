import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({
  promiseLib,
})

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)
module.exports = db
